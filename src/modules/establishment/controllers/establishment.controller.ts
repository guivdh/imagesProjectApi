import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('establishments')
@Controller({
    path: 'establishments',
})
export class EstablishmentController {
    constructor() {
    }
}
