import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {LikeDTO} from "../../like/dto/like.dto";
import {Like} from "../../like/entities/like.entity";
import {CreateCommentDTO} from "../dto/create-comment.dto";
import {Comment} from "../entities/comment.entity";
import {PublicationService} from "../../publication/services/publication.service";
import {UserService} from "../../user/services/user.service";
import {CommentService} from "../services/comment.service";

@ApiTags('comments')
@Controller({
    path: 'comments',
})
export class CommentController {
    constructor(
        private publicationService: PublicationService,
        private userService: UserService,
        private commentService: CommentService
    ) {
    }

    /*@Post()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK })
    async addComment(@Body() dto: CreateCommentDTO): Promise<Comment>{
        const comment = new Comment();
        comment.publication = await this.publicationService.findOneById(dto.publicationId);
        comment.user = await this.userService.findOne({where: {email: 'private@g-vandenherrewegen.be'}});
        comment.comment = dto.comment;
        return await this.commentService.save(comment);
    }*/
}
