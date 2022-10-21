import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async getAll(): Promise<Role[]> {
    return this.createQueryBuilder('r')
      .getMany();
  }
}
