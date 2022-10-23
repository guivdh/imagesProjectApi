import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Establishment} from "../entities/establishment.entity";
import {EstablishmentRepository} from "../repositories/establishment.repository";
import { Publication } from "../../publication/entities/publication.entity";

@Injectable()
export class EstablishmentService extends RepositoryService<Establishment> {
    constructor(
        protected readonly repo: EstablishmentRepository,
    ) {
        super(repo);
    }

    async getAll(): Promise<Establishment[]> {
        return this.repo.find({relations: ['image', 'address', 'address.country']});
    }
}
