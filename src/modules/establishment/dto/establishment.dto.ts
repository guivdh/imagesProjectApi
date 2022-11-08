import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";
import { ImageDTO } from "../../image/dto/image.dto";
import { AddressDTO } from "../../address/dto/address.dto";
import { CountryDTO } from "../../country/dto/country.dto";

export class EstablishmentDTO {
  @ApiProperty()
  @DTOMapping()
  id: string;

  @DTOMapping()
  name: string;

  @ApiProperty()
  @DTOMapping()
  description: string;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: ImageDTO})
  image: ImageDTO;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: AddressDTO})
  address: AddressDTO;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: CountryDTO})
  country: CountryDTO;
}
