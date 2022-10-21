import { ApiProperty } from '@nestjs/swagger';
import { DTOMapping } from '../../../../core/decorators/mapping.decorator';

export class SimpleUserDTO {
  @ApiProperty()
  @DTOMapping()
  id: number;
}
