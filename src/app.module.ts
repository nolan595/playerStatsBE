import { Module } from '@nestjs/common';

import { TeamModule } from './team/team.module';
import { SporteventModule } from './sportevent/sportevent.module';

@Module({
  imports: [TeamModule, SporteventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
