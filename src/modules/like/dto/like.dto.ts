import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class LikeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  publicationId: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  userId: string
}