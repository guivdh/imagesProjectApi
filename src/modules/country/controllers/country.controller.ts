import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";
import { PublicationDTO } from "../../publication/dto/publication.dto";
import { Publication } from "../../publication/entities/publication.entity";
import { CountryService } from "../services/country.service";
import { CountryDTO } from "../dto/country.dto";
import { Country } from "../entities/country.entity";

@ApiTags('countries')
@Controller({
    path: 'countries',
})
export class CountryController {
    constructor(
      private countryService: CountryService
    ) {
    }

    @Get()
    @ApiResponse({status: 200, type: CountryDTO, isArray: true})
    async getAll(): Promise<CountryDTO[]> {
        const countries = await this.countryService.getAll();
        return Country.toDTOList(countries, CountryDTO);
    }
}
