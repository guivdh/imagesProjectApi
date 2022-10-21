import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('comments')
@Controller({
    path: 'comments',
})
export class CommentController {
    constructor() {
    }

}
