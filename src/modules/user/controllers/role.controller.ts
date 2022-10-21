import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../core/decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { RoleService } from '../services/role.service';
import { RoleDTO } from '../dto/role/role.dto';
import { Role } from '../entities/role.entity';

@ApiTags('roles')
@Controller({
  path: 'roles',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
  ) {
  }

  @Get()
  @Roles(RoleEnum.ADMINISTRATOR)
  @ApiResponse({ status: 200, type: RoleDTO, isArray: true })
  async getAll(): Promise<RoleDTO[]> {
    const roles = await this.roleService.getAll();
    return Role.toDTOList(roles, RoleDTO);
  }
}
