import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityManager } from 'typeorm';
import { RepositoryService } from '../../../core/services/repository.service';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService extends RepositoryService<User> {
  constructor(
    protected readonly repo: UserRepository,
    private readonly mailerService: MailerService,
  ) {
    super(repo);
  }

  async getAll(): Promise<User[]> {
    return this.repo.findAllWithRole();
  }

  async getUserWithRole(userId: number): Promise<User> {
    return this.repo.findOneWithRole(userId);
  }

  async insert(user: User): Promise<User> {
    return this.repo.manager.transaction(async (em: EntityManager) => {
      return em.save(User, user);
    });
  }

  async generatePasswordAndSalt(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.repo.findOneByEmail(email);
  }
}
