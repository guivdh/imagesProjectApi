import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Like} from "../entities/like.entity";
import {LikeRepository} from "../repositories/like.repository";

@Injectable()
export class LikeService extends RepositoryService<Like> {
    constructor(
        protected readonly repo: LikeRepository,
    ) {
        super(repo);
    }
}
