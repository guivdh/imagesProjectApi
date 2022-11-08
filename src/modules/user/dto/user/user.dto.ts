import { ApiProperty } from '@nestjs/swagger';
import { DTOMapping } from '../../../../core/decorators/mapping.decorator';
import { SimpleUserDTO } from './simple-user.dto';
import { RoleDTO } from '../role/role.dto';

export class UserDTO extends SimpleUserDTO {
  @ApiProperty()
  @DTOMapping()
  firstName: string;

  @ApiProperty()
  @DTOMapping()
  lastName: string;

  @ApiProperty()
  @DTOMapping()
  email: string;

  @ApiProperty()
  @DTOMapping()
  isActive: boolean;

  @ApiProperty()
  @DTOMapping()
  pseudo: string;

  @ApiProperty()
  @DTOMapping({ property: 'role' })
  role: RoleDTO;
}
