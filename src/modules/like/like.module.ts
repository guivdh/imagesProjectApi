import {TypeOrmModule} from '@nestjs/typeorm';
import { forwardRef, Module } from "@nestjs/common";
import {Like} from "./entities/like.entity";
import {LikeRepository} from "./repositories/like.repository";
import {LikeController} from "./controllers/like.controller";
import {LikeService} from "./services/like.service";
import { PublicationService } from "../publication/services/publication.service";
import { PublicationModule } from "../publication/publication.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Like,
            LikeRepository
        ]),
        forwardRef(() => PublicationModule),
      UserModule
    ],
    controllers: [
        LikeController
    ],
    providers: [
        LikeService,
    ],
    exports: [
      LikeService
    ],
})
export class LikeModule {
}
