import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";

@ApiTags('addresses')
@Controller({
    path: 'addresses',
})
export class AddressController {
    constructor() {
    }

}
