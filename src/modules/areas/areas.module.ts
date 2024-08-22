import { Areas } from './models/domain/areas.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AreasService} from './services/areas.service'
import { AreasController } from './controllers/api/v1/areas-v1.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Areas])],
  controllers: [AreasController],
  providers: [AreasService]
})
export class AreasModule { }