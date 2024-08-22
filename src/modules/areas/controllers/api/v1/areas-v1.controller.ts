import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AreasService } from '../../../services/areas.service';
import { CreateAreaDto } from 'src/modules/areas/models/dto/area.dto';
import { SearchAreaDto } from 'src/modules/areas/models/dto/search.area';
import { UpdateAreaDto } from 'src/modules/areas/models/dto/update.area.dto';
import { AuthGuard } from 'src/guards/authentication/dto/auth.guard copy';
import { EditorGuard } from 'src/guards/authentication/dto/editor.guard';
import { AdminGuard } from 'src/guards/authentication/dto/admin.guard';

@Controller('area')
@UseGuards(AuthGuard)
export class AreasController {
  constructor(private AreasService: AreasService) { }

  @Post('/createArea')
  async createArea(@Body() body: CreateAreaDto) {
    return this.AreasService.create(body.name, body.description, body.country, body.population);
  }

  @Get()
  async getAllAreas() { return this.AreasService.find(); }

  @Get('/search')
  async sortArea(@Query() query: SearchAreaDto) {
    return this.AreasService.find(query);
  }

  @Get('/single/:id')
  async findAreaById(@Param('id') id: number) {
    return this.AreasService.findById(id);
  }

  @Patch('/:id')
  @UseGuards(EditorGuard)
  updateArea(@Param('id') id: number, @Body() body: UpdateAreaDto) {
    return this.AreasService.update(id, body)
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeArea(@Param('id') id: number) {
    return this.AreasService.remove(id)
  }

}
