import {RepositoryService} from '../../../core/services/repository.service';
import {Parameter} from '../entities/parameter.entity';
import {Injectable} from '@nestjs/common';
import {ParameterRepository} from "../repositories/parameter.repository";
import { EntityManager } from 'typeorm';

@Injectable()
export class ParameterService extends RepositoryService<Parameter> {
  constructor(
      protected readonly repo: ParameterRepository,
  ) {
      super(repo);
  }

  async findOneByCodeAndId(code: string, id: number): Promise<Parameter> {
      return this.repo.findOneByCodeAndId(code, id);
  }

  async findAllByCodeAndIds(code: string, ids: string[]): Promise<Parameter[]> {
      return this.repo.findAllByCodeAndIds(code, ids);
  }

  async findByCodesAndIds(codes: string[], ids: string[]): Promise<Parameter[]> {
      return this.repo.findByCodesAndIds(codes, ids);
  }

  async findAllByCode(code: string): Promise<Parameter[]> {
    return this.repo.findAllByCode(code);
  }

  async findActiveAllByCode(code: string, showID: number = -1, ShowInactive: boolean = false): Promise<Parameter[]> {
    return this.repo.findAllActiveByCode(code, showID, ShowInactive);
  }

  async findOneByValue(value: any) {
      return this.repo.findByValue(value);
  }

  async findAllWithLabel(): Promise<Parameter[]> {
      return this.repo.findAllWithLabel();
  }

  async findOneWithLabelById(id: number): Promise<Parameter> {
      return this.repo.findOneWithLabelById(id);
  }

  async insert(parameter: Parameter): Promise<Parameter> {
    return this.repo.manager.transaction(async (em: EntityManager) => {
      return em.save(Parameter, parameter);
    });
  }
}
