import {Injectable} from "@nestjs/common";
import {RepositoryService} from "../../../core/services/repository.service";
import {Country} from "../entities/country.entity";
import {CountryRepository} from "../repositories/country.repository";

@Injectable()
export class CountryService extends RepositoryService<Country> {
    constructor(
        protected readonly repo: CountryRepository,
    ) {
        super(repo);
    }

}
