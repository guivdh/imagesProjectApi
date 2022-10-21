import {ApiProperty} from "@nestjs/swagger";
import {DTOMapping} from "../../../../core/decorators/mapping.decorator";
import {IsString} from "class-validator";

export class ParameterCategoryDTO {
  @ApiProperty()
  @DTOMapping()
  id: number;

  @ApiProperty()
  @DTOMapping()
  @IsString()
  name: string;

  @ApiProperty()
  @DTOMapping()
  @IsString()
  labelFr: string;
}
