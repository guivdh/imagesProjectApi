import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findAllWithRole(): Promise<User[]> {
    return this.createQueryBuilder('u')
      .innerJoinAndSelect('u.role', 'r')
      .getMany();
  }

  async findOneWithRole(userId: number): Promise<User> {
    return this.findOne(userId, { relations: ['role'] });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('u')
      .where('u.email = :email', { email })
      .getOne();
  }
}
