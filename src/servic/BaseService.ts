import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';

@Injectable()
export class BaseService<T extends object> {
  constructor(protected repo: Repository<T>) {}

  create = (entity: DeepPartial<T>) => this.repo.save(this.repo.create(entity));

  findById = (id: number) => {
    const where = { id } as unknown as FindOptionsWhere<T>;
    return this.repo.findOne({ where });
  };

  find = (field?: FindOptionsWhere<T>) =>
    field ? this.repo.find({ where: field }) : this.repo.find();

  update = async (id: number, attrs: DeepPartial<T>) => {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(`${this.repo.metadata.name} not found`);
    Object.assign(entity, attrs);
    return this.repo.save(entity);
  };

  remove = async (id: number) => {
    const entity = await this.findById(id);
    if (!entity) throw new NotFoundException(`${this.repo.metadata.name} not found`);
    return this.repo.remove(entity);
  };
}
