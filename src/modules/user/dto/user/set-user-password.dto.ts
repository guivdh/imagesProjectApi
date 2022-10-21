import { ApiProperty } from '@nestjs/swagger';
import { DTOMapping } from '../../../../core/decorators/mapping.decorator';
import { IsString } from 'class-validator';

export class SetUserPasswordDTO {
  @ApiProperty()
  @DTOMapping()
  @IsString()
  password: string;

  @ApiProperty()
  @DTOMapping()
  @IsString()
  token: string;
}
