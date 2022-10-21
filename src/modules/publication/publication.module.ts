import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Publication} from "./entities/publication.entity";
import {PublicationRepository} from "./repositories/publication.repository";
import {PublicationController} from "./controllers/publication.controller";
import {PublicationService} from "./services/publication.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Publication,
            PublicationRepository
        ]),
    ],
    controllers: [
        PublicationController
    ],
    providers: [
        PublicationService
    ],
    exports: [],
})
export class PublicationModule {
}
