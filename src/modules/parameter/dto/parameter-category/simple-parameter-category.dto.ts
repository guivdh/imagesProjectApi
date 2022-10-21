import {ApiProperty} from '@nestjs/swagger';
import {DTOMapping} from '../../../../core/decorators/mapping.decorator';

export class SimpleParameterCategoryDTO {
  @ApiProperty()
  @DTOMapping()
  id: number;
}
