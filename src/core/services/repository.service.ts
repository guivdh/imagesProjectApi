import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

export abstract class RepositoryService<T> {

  constructor(
    protected readonly repo: Repository<T>,
  ) {
  }

  findOneById(id: number | string, options?: FindOneOptions<T>): Promise<T> {
    return this.repo.findOne(id, options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repo.findOne(options);
  }

  findOneOrFail(id: number | string, options?: FindOneOptions<T>): Promise<T> {
    return this.repo.findOneOrFail(id, options);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  findByIds(ids: number[], options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.findByIds(ids, options);
  }

  create(dto?: DeepPartial<T>): T {
    return this.repo.create(dto);
  }

  save(entity: T): Promise<T> {
    return this.repo.save(entity);
  }

  saveMany(entities: T[]): Promise<T[]> {
    return this.repo.save(entities);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  delete(entity: T): Promise<T> {
    return this.repo.remove(entity);
  }

  transaction<R>(runInTransaction: (entityManager: EntityManager) => Promise<R>) {
    return this.repo.manager.transaction(runInTransaction);
  }

  count(options?: FindManyOptions<T>): Promise<number> {
    return this.repo.count(options);
  }
}
