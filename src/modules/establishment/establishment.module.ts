import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Establishment} from "./entities/establishment.entity";
import {EstablishmentRepository} from "./repositories/establishment.repository";
import {EstablishmentController} from "./controllers/establishment.controller";
import {EstablishmentService} from "./services/establishment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Establishment,
            EstablishmentRepository
        ]),
    ],
    controllers: [
        EstablishmentController
    ],
    providers: [EstablishmentService],
    exports: [],
})
export class EstablishmentModule {
}
