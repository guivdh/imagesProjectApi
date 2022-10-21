import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Like} from "./entities/like.entity";
import {LikeRepository} from "./repositories/like.repository";
import {LikeController} from "./controllers/like.controller";
import {LikeService} from "./services/like.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Like,
            LikeRepository
        ]),
    ],
    controllers: [
        LikeController
    ],
    providers: [
        LikeService
    ],
    exports: [],
})
export class LikeModule {
}
