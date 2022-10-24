import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Rating} from "./entities/rating.entity";
import {RatingRepository} from "./repositories/rating.repository";
import {RatingController} from "./controllers/rating.controller";
import {RatingService} from "./services/rating.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Rating,
            RatingRepository
        ]),
    ],
    controllers: [
        RatingController
    ],
    providers: [
        RatingService
    ],
    exports: [],
})
export class RatingModule {
}
