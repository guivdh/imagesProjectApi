import { ApiProperty } from '@nestjs/swagger';
import { DTOMapping } from '../../../../core/decorators/mapping.decorator';
import { IsString } from 'class-validator';

export class ResetUserPasswordDTO {
  @ApiProperty()
  @DTOMapping()
  @IsString()
  email: string;
}
