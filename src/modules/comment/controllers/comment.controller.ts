import { ApiResponse, ApiTags } from "@nestjs/swagger";
import {Body, Controller, forwardRef, Get, HttpCode, HttpStatus, Inject, Param, Post} from "@nestjs/common";
import { LikeDTO } from "../../like/dto/like.dto";
import { Like } from "../../like/entities/like.entity";
import { CreateCommentDTO } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";
import { PublicationService } from "../../publication/services/publication.service";
import { UserService } from "../../user/services/user.service";
import { CommentService } from "../services/comment.service";
import { LikeService } from "../../like/services/like.service";
import {EstablishmentDTO} from "../../establishment/dto/establishment.dto";
import {Establishment} from "../../establishment/entities/establishment.entity";
import {CommentDTO} from "../dto/comment.dto";

@ApiTags("comments")
@Controller({
  path: "comments"
})
export class CommentController {
  constructor(
    @Inject(forwardRef(() => PublicationService))
    private publicationService: PublicationService,
    private userService: UserService,
    private commentService: CommentService
  ) {
  }

  @Get('publication/:id')
  @ApiResponse({status: 200, type: CommentDTO})
  async getAllByPublication(@Param('id') id: string): Promise<CommentDTO[]> {
    const comments = await this.commentService.findAll({where: {publication: id}, relations: ['publication', 'user']});
    return Comment.toDTOList(comments, CommentDTO);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  async addComment(@Body() dto: CreateCommentDTO): Promise<Comment> {
    const comment = new Comment();
    comment.publication = await this.publicationService.findOneById(dto.publicationId);
    comment.user = await this.userService.findOne({ where: { email: "private@g-vandenherrewegen.be" } });
    comment.comment = dto.comment;
    return await this.commentService.save(comment);
  }
}
