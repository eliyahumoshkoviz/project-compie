import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../models/domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) { }

  create = async (email: string, password: string, username: string) => {
    const user = await this.repo.save(this.repo.create({ email, password, username }))
    if ((await this.find()).length === 1) return this.update(user.id, { role_id: 4 })
    return user;
  }

  find = (email?: string) => email ? this.repo.find({ where: { email } }) : this.repo.find();
  findById = (id: number) => this.repo.find({ where: { id } })

  update = async (id: number, attrs: Partial<Users>) => {
    const [user] = await this.findById(id)
    if (!user) throw new NotFoundException('User not found');
    Object.keys(attrs).forEach((key) => {
      if (key in user) user[key] = attrs[key];
    });
    return this.repo.save(user)
  }

  remove = async (id: number) => {
    const user = await this.findById(id)
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user)
  }

}
