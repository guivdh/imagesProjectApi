import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, UserRepository,
      Role, RoleRepository,
    ]),
  ],
  exports: [
    UserService, RoleService,
  ],
  providers: [
    UserService, RoleService,
  ],
  controllers: [
    UserController,
    RoleController,
  ],
})
export class UserModule {
}
