import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";
import { ImageDTO } from "../../image/dto/image.dto";
import { CountryDTO } from "../../country/dto/country.dto";

export class AddressDTO {
  @ApiProperty()
  @DTOMapping()
  street: string;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: CountryDTO})
  country: CountryDTO;
}