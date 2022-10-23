import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { Publication } from "../../publication/entities/publication.entity";
import { EstablishmentService } from "../services/establishment.service";
import { EstablishmentDTO } from "../dto/establishment.dto";
import { UpdateUserDTO } from "../../user/dto/user/update-user.dto";

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

    @Post()
    @ApiResponse({ status: HttpStatus.OK })
    async createOne(@Body() dto: any) {
        console.log(dto);
    }
}
