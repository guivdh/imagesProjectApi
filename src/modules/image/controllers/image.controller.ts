import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('images')
@Controller({
    path: 'images',
})
export class ImageController {
    constructor() {
    }

}
