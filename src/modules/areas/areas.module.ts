import { Areas } from './models/domain/areas.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AreasService} from './services/areas.service'

@Module({
  imports: [TypeOrmModule.forFeature([Areas])],
  // controllers: [UsersController],
  providers: [AreasService]
})
export class UsersModule { }