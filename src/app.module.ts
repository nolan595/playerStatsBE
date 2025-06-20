import { Module } from '@nestjs/common';

import { TeamModule } from './team/team.module';
import { SporteventModule } from './sportevent/sportevent.module';
import { PlayerModule } from './player/player.module';
import { SuperbetApiModule } from './superbet-api/superbet-api.module';

@Module({
  imports: [TeamModule, SporteventModule, PlayerModule, SuperbetApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
