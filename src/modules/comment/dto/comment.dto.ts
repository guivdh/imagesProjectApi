import {ApiProperty} from "@nestjs/swagger";
import {DTOMapping} from "../../../core/decorators/mapping.decorator";
import {PseudoUserDTO} from "../../user/dto/user/pseudo-user.dto";

export class CommentDTO {
    @ApiProperty()
    @DTOMapping()
    comment: string;

    @ApiProperty()
    @DTOMapping({dtoOrEntity: PseudoUserDTO})
    user: PseudoUserDTO;
}
