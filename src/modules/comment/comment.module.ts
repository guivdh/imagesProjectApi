import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Comment} from "./entities/comment.entity";
import {CommentRepository} from "./repositories/comment.repository";
import {CommentController} from "./controllers/comment.controller";
import {CommentService} from "./services/comment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Comment,
            CommentRepository
        ]),
    ],
    controllers: [
        CommentController
    ],
    providers: [
        CommentService
    ],
    exports: [],
})
export class CommentModule {
}
