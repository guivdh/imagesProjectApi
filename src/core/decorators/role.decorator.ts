import { RoleEnum } from '../../modules/user/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
