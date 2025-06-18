import { Injectable } from '@nestjs/common';
import { CreateSporteventDto } from './dto/create-sportevent.dto';
import { UpdateSporteventDto } from './dto/update-sportevent.dto';

@Injectable()
export class SporteventService {
  create(createSporteventDto: CreateSporteventDto) {
    return 'This action adds a new sportevent';
  }

  findAll() {
    return `This action returns all sportevent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sportevent`;
  }

  update(id: number, updateSporteventDto: UpdateSporteventDto) {
    return `This action updates a #${id} sportevent`;
  }

  remove(id: number) {
    return `This action removes a #${id} sportevent`;
  }
}
