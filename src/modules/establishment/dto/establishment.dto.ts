import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";
import { ImageDTO } from "../../image/dto/image.dto";
import { AddressDTO } from "../../address/dto/address.dto";

export class EstablishmentDTO {
  @ApiProperty()
  @DTOMapping()
  name: string;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: ImageDTO})
  image: ImageDTO;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: AddressDTO})
  address: AddressDTO;
}
