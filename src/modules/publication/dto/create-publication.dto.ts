import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";
import { RoleDTO } from "../../user/dto/role/role.dto";
import { ImageDTO } from "../../image/dto/image.dto";
import { EstablishmentDTO } from "../../establishment/dto/establishment.dto";
import {IsNotEmpty, IsNumber, Length} from "class-validator";
import {StringToNumber} from "../../../core/decorators/transform.decorators";
import {Image} from "../../image/entities/image.entity";
import {Publication} from "../entities/publication.entity";
import {Establishment} from "../../establishment/entities/establishment.entity";

export class CreatePublicationDTO {

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  dishName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  dishType: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  establishmentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @StringToNumber()
  presentation: number;

  @ApiProperty()
  @IsNotEmpty()
  @StringToNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @StringToNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @StringToNumber()
  taste: number;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  ratingDescription: string;

  @ApiProperty()
  image: Image;

  @ApiProperty()
  establishment: Establishment;
}
