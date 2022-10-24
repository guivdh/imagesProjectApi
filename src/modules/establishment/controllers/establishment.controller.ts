import {ApiConsumes, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpStatus, Post, Res, Request, UseInterceptors, UploadedFile} from "@nestjs/common";
import { Publication } from "../../publication/entities/publication.entity";
import { EstablishmentService } from "../services/establishment.service";
import { EstablishmentDTO } from "../dto/establishment.dto";
import {CreateEstablishmentDTO} from "../dto/create-establishment.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('establishments')
@Controller({
    path: 'establishments',
})
export class EstablishmentController {
    constructor(
      private establishmentService: EstablishmentService,
    ) {
    }

    @Get()
    @ApiResponse({status: 200, type: EstablishmentDTO, isArray: true})
    async getAll(): Promise<EstablishmentDTO[]> {
        const establishments = await this.establishmentService.getAll();
        return Publication.toDTOList(establishments, EstablishmentDTO);
    }

    /*@Post()
    @ApiResponse({ status: HttpStatus.OK })
    async createOne(@Request() request: any) {
        console.log(request.file);
        console.log(request.body);
    }
*/
    @Post('upload')
    @UseInterceptors(FileInterceptor('photo', { dest: './uploads' }))
    uploadSingle(@UploadedFile() file) {
        console.log(file);
    }
}
