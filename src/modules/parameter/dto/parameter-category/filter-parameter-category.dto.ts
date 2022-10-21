import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class FilterParameterCategoryDTO {

  @ApiProperty({ type: [String] })
  @IsString({
    each: true,
  })
  names: string[];
}
