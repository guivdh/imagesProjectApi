import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('likes')
@Controller({
    path: 'likes',
})
export class LikeController {
    constructor() {
    }

}
