import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Establishment} from "../entities/establishment.entity";
import {EstablishmentRepository} from "../repositories/establishment.repository";
import { Publication } from "../../publication/entities/publication.entity";
import {EntityManager} from "typeorm";
import {User} from "../../user/entities/user.entity";

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

    async insert(establishment: Establishment) {
        return this.repo.manager.transaction(async (em: EntityManager) => {
            return em.save(Establishment, establishment);
        });
    }

  async getAllLight() {
    return this.repo.createQueryBuilder('es')
      .select(['es.id as id', 'es.name AS title'])
      .getRawMany();
  }
}
