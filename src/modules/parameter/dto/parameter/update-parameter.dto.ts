import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, Length} from 'class-validator';

export class UpdateParameterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Length(0, 255)
  labelFr: string;
}
