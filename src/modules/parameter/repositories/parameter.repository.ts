import { Brackets, EntityRepository, Repository } from 'typeorm';
import {Parameter} from '../entities/parameter.entity';

@EntityRepository(Parameter)
export class ParameterRepository extends Repository<Parameter> {

    async findOneByCodeAndId(code: string, id: number): Promise<Parameter> {
        if (!id) return null;
        return this.createQueryBuilder('p')
            .innerJoin('p.parameterCategory', 'pc')
            .where('p.id = :id', { id })
            .andWhere('pc.name = :code', { code })
            .getOne();
    }

    async findAllByCodeAndIds(code: string, ids: string[]): Promise<Parameter[]> {
        if (!ids || !ids.length) {
            return [];
        }

        return this.createQueryBuilder('p')
            .innerJoin('p.parameterCategory', 'pc')
            .where('p.id IN (:...ids)', { ids })
            .andWhere('pc.name = :code', { code })
            .getMany();
    }

    /**
     * Find the parameters in a set of ids and codes
     */
    async findByCodesAndIds(codes: string[], ids: string[]): Promise<Parameter[]> {
        if (!codes || !codes.length || !ids || !ids.length) {
            return null;
        }

        return this.createQueryBuilder('p')
            .innerJoin('p.parameterCategory', 'pc')
            .where('p.id IN (:...ids)', { ids })
            .andWhere('pc.name = (:...codes)', { codes })
            .getMany();
    }

  async findAllByCode(code: string): Promise<Parameter[]> {
    return this.createQueryBuilder('p')
      .innerJoin('p.parameterCategory', 'pc')
      .where('pc.name = :code', { code })
      .getMany();
  }

  async findAllActiveByCode(code: string, showID: number = -1, ShowInactive: boolean = false): Promise<Parameter[]> {
    return this.createQueryBuilder('p')
      .innerJoin('p.parameterCategory', 'pc')
      .where('pc.name = :code', { code })
      .andWhere(new Brackets(qb => {
        qb.where('p.is_active = true')
          .orWhere('true = :ShowInactive', { ShowInactive })
          .orWhere('p.id = :showID', { showID })
      }))
      .orderBy('p.label_fr')
      .getMany();
  }

    async findByValue(value: any) {
        return this.createQueryBuilder('p')
            .where('p.logic_value = :value', { value })
            .getOne();
    }

    async findAllWithLabel(): Promise<Parameter[]> {
        return this.createQueryBuilder('p')
            .innerJoinAndSelect('p.parameterCategory', 'pc')
            .getMany();
    }

    async findOneWithLabelById(id: number): Promise<Parameter> {
        return this.createQueryBuilder('p')
            .where('p.id = :id', { id })
            .innerJoinAndSelect('p.parameterCategory', 'pc')
            .getOne();
    }
}
