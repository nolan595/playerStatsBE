import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SporteventService } from './sportevent.service';
import { CreateSportEventDto } from './dto/create-sportevent.dto';
import { UpdateSporteventDto } from './dto/update-sportevent.dto';

@Controller('sportevent')
export class SporteventController {
  constructor(private readonly sporteventService: SporteventService) {}

  @Post()
  create(@Body() createSporteventDto: CreateSportEventDto) {
    return this.sporteventService.create(createSporteventDto);
  }

  @Get('/offer:fileName')
  retrieveFromOffer(@Param('fileName') fileName: string) {
    return this.sporteventService.retrieveFromOffer(fileName);
  }

  @Get('/offer/files')
  retrieveOfferFiles() {
    return this.sporteventService.retrieveOfferFiles();
  }

  @Get()
  findAll() {
    return this.sporteventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sporteventService.findOne(+id);
  }

  @Get('stats/:id')
  getEventStats(@Param('id') id: string) {
    return this.sporteventService.getStats(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSporteventDto: UpdateSporteventDto,
  ) {
    return this.sporteventService.update(+id, updateSporteventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sporteventService.remove(+id);
  }
}
