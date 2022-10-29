import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";
import { ImageDTO } from "../../image/dto/image.dto";
import { AddressDTO } from "../../address/dto/address.dto";

export class LightEstablishmentDTO {
  @ApiProperty()
  @DTOMapping()
  id: string;

  @ApiProperty()
  @DTOMapping()
  title: string;
}
