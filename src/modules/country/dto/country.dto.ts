import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";

export class CountryDTO {
  @ApiProperty()
  @DTOMapping()
  id: string;


  @ApiProperty()
  @DTOMapping()
  label: string;
}