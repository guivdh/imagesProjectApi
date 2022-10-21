import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Controller, Get} from "@nestjs/common";
import {PublicationDTO} from "../dto/publication.dto";
import {PublicationService} from "../services/publication.service";
import {Publication} from "../entities/publication.entity";

@ApiTags('publications')
@Controller({
    path: 'publications',
})
export class PublicationController {
    constructor(
        private publicationService: PublicationService
    ) {
    }

    @Get()
    @ApiResponse({status: 200, type: PublicationDTO, isArray: true})
    async getAll(): Promise<PublicationDTO[]> {
        const publications = await this.publicationService.getAll();
        return Publication.toDTOList(publications, PublicationDTO);
    }
}
