import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Places } from '../models/domain/places.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../servic/BaseService'

@Injectable()
export class PlacesService extends BaseService<Places> {
  constructor(@InjectRepository(Places) repo: Repository<Places>) { super(repo) }

  find = (field?: Partial<Places>) =>
    this.repo.find({
      where: field,
      relations: ['area'],
    });
}
