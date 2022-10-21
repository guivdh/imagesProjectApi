import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Publication} from "../entities/publication.entity";
import {PublicationRepository} from "../repositories/publication.repository";
import {User} from "../../user/entities/user.entity";

@Injectable()
export class PublicationService extends RepositoryService<Publication> {
    constructor(
        protected readonly repo: PublicationRepository,
    ) {
        super(repo);
    }

    async getAll(): Promise<Publication[]> {
        return this.repo.find();
    }
}
