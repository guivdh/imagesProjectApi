import {RepositoryService} from '../../../core/services/repository.service';
import {ParameterCategory} from '../entities/parameter-category.entity';
import {ParameterCategoryRepository} from '../repositories/parameter-category.repository';
import {Injectable} from '@nestjs/common';
import {FilterParameterCategoryDTO} from '../dto/parameter-category/filter-parameter-category.dto';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class ParameterCategoryService extends RepositoryService<ParameterCategory> {
  constructor(
      protected readonly repo: ParameterCategoryRepository,
  ) {
      super(repo);
  }

  async findAll(): Promise<ParameterCategory[]> {
      return this.repo.findAll();
  }

  async findAllByFilter(dto: FilterParameterCategoryDTO): Promise<ParameterCategory[]> {
      return this.repo.findAllByFilter(dto);
  }

  findOneByCode(code: string): Promise<ParameterCategory> {
    return this.repo.findOneByCode(code);
  }
}
