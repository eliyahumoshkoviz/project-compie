import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Areas } from '../models/domain/areas.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AreasService {
  constructor(@InjectRepository(Areas) private repo: Repository<Areas>) { }

  // create = (email: string, password: string, username: string) => this.repo.save(this.repo.create({ email, password, username }))

  // find = (email?: string) => email ? this.repo.find({ where: { email } }) : this.repo.find();
  // findById = (id: number) => this.repo.find({ where: { id } })

}