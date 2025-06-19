import { Module } from '@nestjs/common';

import { TeamModule } from './team/team.module';
import { SporteventModule } from './sportevent/sportevent.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [TeamModule, SporteventModule, PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
