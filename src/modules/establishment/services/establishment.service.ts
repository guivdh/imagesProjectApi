import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Establishment} from "../entities/establishment.entity";
import {EstablishmentRepository} from "../repositories/establishment.repository";

@Injectable()
export class EstablishmentService extends RepositoryService<Establishment> {
    constructor(
        protected readonly repo: EstablishmentRepository,
    ) {
        super(repo);
    }
}
