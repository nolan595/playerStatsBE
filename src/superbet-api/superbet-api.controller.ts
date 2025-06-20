import { Controller, Get, Param } from '@nestjs/common';
import { SuperbetApiService } from './superbet-api.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Controller('superbet-api')
export class SuperbetApiController {
  constructor(
    private readonly superbetApiService: SuperbetApiService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Get('stats/match-stats/:matchId')
  getMatchStats(@Param('matchId') matchId: string) {
    return this.superbetApiService.getMatchStats(matchId);
  }

  @Get('stats/team-players/:teamId')
  getTeamPlayers(@Param('teamId') teamId: string) {
    return this.superbetApiService.getTeamPlayers(teamId);
  }
  @Get('stats/player-match-stats/:matchId/:playerId')
  getPlayerMatchStats(
    @Param('matchId') matchId: string,
    @Param('playerId')
    playerId: string,
  ) {
    return this.superbetApiService.getPlayerMatchStats(matchId, playerId);
  }
}
