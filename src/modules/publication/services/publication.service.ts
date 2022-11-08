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
        return this.repo.find({relations: ['user', 'image', 'establishment']});
    }

    async getAllWithRatingAverage() {
        return this.repo.createQueryBuilder('p')
          .select('(p.presentation + p.price + p.taste + p.quantity)', 'rating')
          .addSelect('i.path', 'path')
          .addSelect('p.id', 'id')
          .leftJoin('p.image', 'i')
          .getRawMany();
    }
}
