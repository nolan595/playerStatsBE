import { PartialType } from '@nestjs/swagger';
import { CreateSporteventDto } from './create-sportevent.dto';

export class UpdateSporteventDto extends PartialType(CreateSporteventDto) {}
