import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../../../core/services/repository.service';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService extends RepositoryService<Role> {
  constructor(
    protected readonly repo: RoleRepository,
  ) {
    super(repo);
  }

  async getAll(): Promise<Role[]> {
    return this.repo.getAll();
  }
}
