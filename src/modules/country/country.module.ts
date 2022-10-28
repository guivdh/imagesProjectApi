import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from '@nestjs/common';
import {Country} from "./entities/country.entity";
import {CountryRepository} from "./repositories/country.repository";
import {CountryController} from "./controllers/country.controller";
import {CountryService} from "./services/country.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Country,
            CountryRepository
        ]),
    ],
    controllers: [
        CountryController
    ],
    providers: [CountryService],
    exports: [CountryService],
})
export class CountryModule {
}
