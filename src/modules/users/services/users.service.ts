import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../models/domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) { }

  create = (email: string, password: string, username: string) => this.repo.save(this.repo.create({ email, password, username }))

  find = (email?: string) => email ? this.repo.find({ where: { email } }) : this.repo.find();
  findById = (id: number) => this.repo.find({ where: { id } })

}