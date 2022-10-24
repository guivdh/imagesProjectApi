import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Rating} from "../entities/rating.entity";
import {RatingRepository} from "../repositories/rating.repository";

@Injectable()
export class RatingService extends RepositoryService<Rating> {
    constructor(
        protected readonly repo: RatingRepository,
    ) {
        super(repo);
    }

    async getAll(): Promise<Rating[]> {
        return this.repo.find();
    }
}
