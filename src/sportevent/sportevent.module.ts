import { Module } from '@nestjs/common';
import { SporteventService } from './sportevent.service';
import { SporteventController } from './sportevent.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SporteventController],
  providers: [SporteventService, PrismaService],
})
export class SporteventModule {}
