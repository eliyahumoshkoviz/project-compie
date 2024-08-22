import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Areas } from '../models/domain/areas.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AreasService {
  constructor(@InjectRepository(Areas) private repo: Repository<Areas>) { }

  create = (name: string, description: string, country: string, population: number) =>
    this.repo.save(this.repo.create({ name, description, country, population }));

  findById = (id: number) => this.repo.find({ where: { id } })
  find = (field?: Partial<Areas>) => field ? this.repo.find({ where: field }) : this.repo.find();

  update = async (id: number, attrs: Partial<Areas>) => {
    const [area] = await this.findById(id)
    if (!area) throw new NotFoundException('Area not found');
    Object.keys(attrs).forEach((key) => {
      if (key in area) area[key] = attrs[key];
    });
    return this.repo.save(area)
  }

  remove = async (id: number) => {
    const area = await this.findById(id)
    if (!area) throw new NotFoundException('Area not found');
    return this.repo.remove(area)
  }

}