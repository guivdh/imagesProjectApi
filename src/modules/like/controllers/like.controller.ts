import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Roles } from "../../../core/decorators/role.decorator";
import { RoleEnum } from "../../user/enums/role.enum";
import { UpdateUserDTO } from "../../user/dto/user/update-user.dto";
import { RoleDTO } from "../../user/dto/role/role.dto";
import { LikeDTO } from "../dto/like.dto";
import { LikeService } from "../services/like.service";
import { Like } from "../entities/like.entity";
import { PublicationService } from "../../publication/services/publication.service";
import { UserService } from "../../user/services/user.service";

@ApiTags("likes")
@Controller({
  path: "likes"
})
export class LikeController {
  constructor(
    private likeService: LikeService,
    private publicationService: PublicationService,
    private userService: UserService
  ) {
  }

  @Post("like")
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  async like(@Body() dto: LikeDTO): Promise<any>{
    //Check if already like
    const isAlreadyLike = await this.likeService.findOne({where: {publication: dto.publicationId, user: '394d6b04-413a-461c-a8a9-696f7a248262'}});
    const like = new Like();
    if(isAlreadyLike) {
      await this.likeService.delete(isAlreadyLike);
      return false;
    }
    like.publication = await this.publicationService.findOneById(dto.publicationId);
    like.user = await this.userService.findOneById('394d6b04-413a-461c-a8a9-696f7a248262');
    return await this.likeService.save(like);
  }
}
