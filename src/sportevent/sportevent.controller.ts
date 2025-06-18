import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SporteventService } from './sportevent.service';
import { CreateSporteventDto } from './dto/create-sportevent.dto';
import { UpdateSporteventDto } from './dto/update-sportevent.dto';

@Controller('sportevent')
export class SporteventController {
  constructor(private readonly sporteventService: SporteventService) {}

  @Post()
  create(@Body() createSporteventDto: CreateSporteventDto) {
    return this.sporteventService.create(createSporteventDto);
  }

  @Get()
  findAll() {
    return this.sporteventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sporteventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSporteventDto: UpdateSporteventDto) {
    return this.sporteventService.update(+id, updateSporteventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sporteventService.remove(+id);
  }
}
