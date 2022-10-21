import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { IsId } from '../../../../core/validation/decorators/is-id.decorator';
import { RoleDTO } from '../role/role.dto';

export class UpdateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsId()
  roleId: number;

  @ApiProperty()
  role: RoleDTO;
}
