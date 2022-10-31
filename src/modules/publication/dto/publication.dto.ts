import { ApiProperty } from "@nestjs/swagger";
import { DTOMapping } from "../../../core/decorators/mapping.decorator";
import { RoleDTO } from "../../user/dto/role/role.dto";
import { ImageDTO } from "../../image/dto/image.dto";
import { EstablishmentDTO } from "../../establishment/dto/establishment.dto";

export class PublicationDTO {
  @ApiProperty()
  @DTOMapping()
  description: string;

  @ApiProperty()
  @DTOMapping()
  dishName: string;

  @ApiProperty()
  @DTOMapping()
  dishType: string;

  @ApiProperty()
  @DTOMapping()
  taste: number;

  @ApiProperty()
  @DTOMapping()
  presentation: number;

  @ApiProperty()
  @DTOMapping()
  quantity: number;

  @ApiProperty()
  @DTOMapping()
  price: number;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: ImageDTO})
  image: ImageDTO;

  @ApiProperty()
  @DTOMapping({dtoOrEntity: EstablishmentDTO})
  establishment: EstablishmentDTO;
}
