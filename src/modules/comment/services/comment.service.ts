import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Comment} from "../entities/comment.entity";
import {CommentRepository} from "../repositories/comment.repository";

@Injectable()
export class CommentService extends RepositoryService<Comment> {
    constructor(
        protected readonly repo: CommentRepository,
    ) {
        super(repo);
    }

}
