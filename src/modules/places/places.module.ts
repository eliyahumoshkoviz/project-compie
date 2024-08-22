import { Places } from './models/domain/places.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {PlacesService} from './services/places.service'
import { PlacesController } from './controllers/api/v1/places-v1.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Places])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule { }