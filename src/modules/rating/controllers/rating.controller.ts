import {ApiTags} from "@nestjs/swagger";
import {Controller} from "@nestjs/common";
import {RatingService} from "../services/rating.service";

@ApiTags('ratings')
@Controller({
    path: 'ratings',
})
export class RatingController {
    constructor(
        private ratingService: RatingService
    ) {
    }
}
