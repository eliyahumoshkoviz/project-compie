import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PlacesService } from '../../../services/places.service';
import { CreatePlacesDto } from 'src/modules/places/models/dto/places.dto';
import { SearchPlacesDto } from 'src/modules/places/models/dto/search.places';
import { UpdatePlacesDto } from 'src/modules/places/models/dto/update.places.dto';
import { AuthGuard } from 'src/guards/authentication/dto/auth.guard copy';
import { EditorGuard } from 'src/guards/authentication/dto/editor.guard';
import { AdminGuard } from 'src/guards/authentication/dto/admin.guard';

@Controller('places')
@UseGuards(AuthGuard)
export class PlacesController {
  constructor(private PlacesService: PlacesService) { }

  @Post('/createPlaces')
  async createPlaces(@Body() body: CreatePlacesDto) {
    return this.PlacesService.create({
      name: body.name,
      area_id: body.area_id,
      description: body.description,
    });
  }

  @Get()
  async getAllPlacess() { return this.PlacesService.find(); }
  
  @Get('/search')
  async sortPlaces(@Query() query: SearchPlacesDto) {
    return this.PlacesService.find(query);
  }

  @Get('/single/:id')
  async findPlacesById(@Param('id') id: number) {
    return this.PlacesService.findById(id);
  }

  @Patch('/:id')
  @UseGuards(EditorGuard)
  updatePlaces(@Param('id') id: number, @Body() body: UpdatePlacesDto) {
    return this.PlacesService.update(id, body)
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removePlaces(@Param('id') id: number) {
    return this.PlacesService.remove(id)
  }

}
