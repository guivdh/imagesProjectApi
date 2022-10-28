import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Image} from "./entities/image.entity";
import {ImageRepository} from "./repositories/image.repository";
import {ImageController} from "./controllers/image.controller";
import {ImageService} from "./services/image.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Image,
            ImageRepository
        ]),
    ],
    controllers: [
        ImageController
    ],
    providers: [
        ImageService
    ],
    exports: [ImageService],
})
export class ImageModule {
}
