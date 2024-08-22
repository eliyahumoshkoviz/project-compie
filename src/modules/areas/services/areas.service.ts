import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Areas } from '../models/domain/areas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../servic/BaseService'

@Injectable()
export class AreasService extends BaseService<Areas> {
  constructor(@InjectRepository(Areas) repo: Repository<Areas>) { super(repo) }
}
