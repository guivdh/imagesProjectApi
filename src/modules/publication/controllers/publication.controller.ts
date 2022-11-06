import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    Body,
    Controller,
    forwardRef,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import {PublicationDTO} from "../dto/publication.dto";
import {PublicationService} from "../services/publication.service";
import {Publication} from "../entities/publication.entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Image} from "../../image/entities/image.entity";
import {CreatePublicationDTO} from "../dto/create-publication.dto";
import {Establishment} from "../../establishment/entities/establishment.entity";
import {EstablishmentService} from "../../establishment/services/establishment.service";
import { LikeService } from "../../like/services/like.service";

@ApiTags('publications')
@Controller({
    path: 'publications',
})
export class PublicationController {
    constructor(
        @Inject(forwardRef(() => LikeService)) private likeService: LikeService,
        private publicationService: PublicationService,
        private establishmentService: EstablishmentService,
    ) {
    }

    @Get()
    @ApiResponse({status: 200, type: PublicationDTO, isArray: true})
    async getAll(): Promise<PublicationDTO[]> {
        const publications = await this.publicationService.getAll();
        return Publication.toDTOList(publications, PublicationDTO);
    }

    @Get('/:id')
    @ApiResponse({status: 200, type: PublicationDTO, isArray: true})
    async getOneById(@Param('id') id: string): Promise<PublicationDTO> {
        const publication = await this.publicationService.findOneById(id, {relations: ['image', 'establishment', 'establishment.image']});
        publication.isLike = !!await this.likeService.findOne({where: {publication: publication.id, user: '394d6b04-413a-461c-a8a9-696f7a248262'}});
        return Publication.toDTO(publication, PublicationDTO);
    }

    @Post()
    @ApiResponse({status: HttpStatus.OK})
    @UseInterceptors(FileInterceptor('publication', {
        storage: diskStorage({
            destination: './public/',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}.jpg`)
            }
        }),
    }))
    async createEstablishment(@Body() dto: CreatePublicationDTO, @UploadedFile() file: Express.Multer.File) {
        dto.image = new Image()
        dto.image.path = file.filename;
        dto.image.label = 'publication';
        let publication = this.publicationService.create(dto);
        publication.establishment = await this.establishmentService.findOneById(dto.establishmentId);
        console.log(publication)
        return await this.publicationService.save(publication);
    }
}
