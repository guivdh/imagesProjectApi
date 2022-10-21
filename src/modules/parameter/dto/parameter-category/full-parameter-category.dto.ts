import {ParameterCategoryDTO} from './parameter-category.dto';
import {ApiProperty} from '@nestjs/swagger';
import {Parameter} from '../../entities/parameter.entity';
import {DTOMapping} from '../../../../core/decorators/mapping.decorator';
import {ParameterDTO} from '../parameter/parameter.dto';

export class FullParameterCategoryDTO extends ParameterCategoryDTO {
  @ApiProperty({ type: ParameterDTO, isArray: true })
  @DTOMapping({ dtoOrEntity: ParameterDTO })
  parameters: Parameter[];
}
