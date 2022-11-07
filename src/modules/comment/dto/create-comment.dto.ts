import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateCommentDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Length(0, 255)
    publicationId: string

    @ApiProperty()
    @IsNotEmpty()
    comment: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(0, 255)
    userId: string
}
