import {TypeOrmModule} from '@nestjs/typeorm';
import { forwardRef, Module } from "@nestjs/common";
import {Comment} from "./entities/comment.entity";
import {CommentRepository} from "./repositories/comment.repository";
import {CommentController} from "./controllers/comment.controller";
import {CommentService} from "./services/comment.service";
import {UserModule} from "../user/user.module";
import {PublicationModule} from "../publication/publication.module";
import { LikeModule } from "../like/like.module";
import { PublicationService } from "../publication/services/publication.service";
import { PublicationRepository } from "../publication/repositories/publication.repository";
import { UserService } from "../user/services/user.service";
import { UserRepository } from "../user/repositories/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Comment,
            CommentRepository
        ]),
        forwardRef(() => PublicationModule),
      UserModule,
    ],
    controllers: [
        CommentController
    ],
    providers: [
        CommentService,
    ],
    exports: [],
})
export class CommentModule {
}
