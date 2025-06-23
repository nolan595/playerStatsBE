import { Controller, Get, Param, Query } from '@nestjs/common';
import { SuperbetApiService } from './superbet-api.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ApiQuery } from '@nestjs/swagger';

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
  @Get('stats/player-live-events/:matchId/:playerId')
  getPlayerLiveEvents(
    @Param('matchId') matchId: string,
    @Param('playerId')
    playerId: string,
  ) {
    return this.superbetApiService.getPlayerLiveEvents(matchId, playerId);
  }

  @Get('stats/player-match-stats/:matchId/:playerId')
  getPlayerMatchStats(
    @Param('matchId') matchId: string,
    @Param('playerId')
    playerId: string,
  ) {
    return this.superbetApiService.getPlayerMatchStats(matchId, playerId);
  }

  @Get('offer/sports-events')
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'pageNumber', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  getOfferFeed(
    @Query('startDate') startDate: string,
    @Query('pageNumber') pageNumber?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    return this.superbetApiService.getOfferFeed(
      startDate,
      pageNumber,
      pageSize,
    );
  }
}
