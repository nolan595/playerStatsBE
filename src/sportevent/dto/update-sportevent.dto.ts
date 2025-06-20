import { PartialType } from '@nestjs/swagger';
import { CreateSportEventDto } from './create-sportevent.dto';

export class UpdateSporteventDto extends PartialType(CreateSportEventDto) {}
