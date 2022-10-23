import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";

export class ImageDTO {
  @ApiProperty()
  @DTOMapping()
  label: string;

  @ApiProperty()
  @DTOMapping()
  content: string;
}
