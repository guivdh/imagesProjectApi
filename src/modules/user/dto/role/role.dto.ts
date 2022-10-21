import { ApiProperty } from '@nestjs/swagger';
import { DTOMapping } from '../../../../core/decorators/mapping.decorator';

export class RoleDTO {

  @ApiProperty()
  @DTOMapping()
  id: string;

  @ApiProperty()
  @DTOMapping()
  role: string;
}
