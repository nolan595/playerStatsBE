import { Module } from '@nestjs/common';
import { SporteventService } from './sportevent.service';
import { SporteventController } from './sportevent.controller';

@Module({
  controllers: [SporteventController],
  providers: [SporteventService],
})
export class SporteventModule {}
