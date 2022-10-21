import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('countries')
@Controller({
    path: 'countries',
})
export class CountryController {
    constructor() {
    }
}
