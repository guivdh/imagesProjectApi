import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { Body, Controller, Get, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import {Publication} from "../../publication/entities/publication.entity";
import {EstablishmentService} from "../services/establishment.service";
import {EstablishmentDTO} from "../dto/establishment.dto";
import {CreateEstablishmentDTO} from "../dto/create-establishment.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Image} from "../../image/entities/image.entity";
import {ImageService} from "../../image/services/image.service";
import {CountryService} from "../../country/services/country.service";
import {Address} from "../../address/entities/address.entity";
import { LightEstablishmentDTO } from "../dto/light-establishment.dto";
import { Establishment } from "../entities/establishment.entity";

@ApiTags('establishments')
@Controller({
    path: 'establishments',
})
export class EstablishmentController {
    constructor(
        private establishmentService: EstablishmentService,
        private imageService: ImageService,
        private countryService: CountryService
    ) {
    }

    @Get()
    @ApiResponse({status: 200, type: EstablishmentDTO, isArray: true})
    async getAll(): Promise<EstablishmentDTO[]> {
        const establishments = await this.establishmentService.getAll();
        return Establishment.toDTOList(establishments, EstablishmentDTO);
    }

    @Get('light')
    @ApiResponse({status: 200, type: LightEstablishmentDTO, isArray: true})
    async getAllLight(): Promise<LightEstablishmentDTO[]> {
        return await this.establishmentService.getAllLight();
    }

    @Get(':id')
    @ApiResponse({status: 200, type: EstablishmentDTO})
    async getOneById(@Param('id') id: string): Promise<EstablishmentDTO> {
        const establishment = await this.establishmentService.findOneById(id, {relations: ['image', 'address']});
        return Establishment.toDTO(establishment, EstablishmentDTO);
    }

    /*@Post()
    @ApiResponse({ status: HttpStatus.OK })
    async createOne(@Request() request: any) {
        console.log(request.file);
        console.log(request.body);
    }
*/

    @Post('upload')
    @ApiResponse({status: HttpStatus.OK})
    @UseInterceptors(FileInterceptor('establishment', {
        storage: diskStorage({
            destination: './public/',
            filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}.jpg`)
            }
        }),
    }))
    async uploadFile(@Body() dto: CreateEstablishmentDTO, @UploadedFile() file: Express.Multer.File) {
        console.log(file)
        dto.image = new Image()
        dto.image.path = file.filename;
        dto.image.label = 'establishment';
        dto.address = new Address();
        dto.address.street = dto.street;
        dto.address.country = await this.countryService.findOneById(dto.country);
        let establishment = this.establishmentService.create(dto);
        return await this.establishmentService.save(establishment);
    }

}
