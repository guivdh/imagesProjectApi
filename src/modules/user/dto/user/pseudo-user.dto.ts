import { ApiProperty } from '@nestjs/swagger';
import { DTOMapping } from '../../../../core/decorators/mapping.decorator';
import { SimpleUserDTO } from './simple-user.dto';
import { RoleDTO } from '../role/role.dto';

export class PseudoUserDTO extends SimpleUserDTO {

    @ApiProperty()
    @DTOMapping()
    pseudo: string;
}
