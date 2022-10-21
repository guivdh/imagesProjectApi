import {EntityRepository, Repository} from 'typeorm';
import {ParameterCategory} from '../entities/parameter-category.entity';
import {Parameter} from "../entities/parameter.entity";
import {FilterParameterCategoryDTO} from "../dto/parameter-category/filter-parameter-category.dto";

@EntityRepository(ParameterCategory)
export class ParameterCategoryRepository extends Repository<ParameterCategory> {

  async findAll(): Promise<ParameterCategory[]> {
    return this.createQueryBuilder('pc')
      .leftJoinAndMapMany('pc.parameters', Parameter, 'p', 'pc.id = p.parameter_category_id')
      .getMany();
  }

  async findAllByFilter(dto: FilterParameterCategoryDTO): Promise<any> {
    const qb = this.createQueryBuilder('pc')
      .leftJoinAndMapMany('pc.parameters', Parameter, 'p', 'pc.id = p.parameter_category_id');

    /*qb.where('pc.name IN (:...names)', {
        names: dto.name,
    });

    qb.orderBy('pc.id')
        .addOrderBy('p.order');*/
    return qb.getMany();
  }

  async findOneByCode(code: string): Promise<ParameterCategory> {
    return this.createQueryBuilder('pc')
      .where('pc.name = :code', { code })
      .getOne();
  }
}
