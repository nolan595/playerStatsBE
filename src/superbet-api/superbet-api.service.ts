import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { LiveEventType, LiveEventSubtype } from './enum/stats-types.enum';
import axios from 'axios';

@Injectable()
export class SuperbetApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getMatchStats(eventId: string): Promise<any> {
    const baseUrl = this.configService.get<string>('STATS_API_URL');
    const url = `${baseUrl}?id=br:match:${eventId}`;
    const response = await axios.get(url);
    return response.data;
  }

  async getTeamPlayers(teamId: string): Promise<any> {
    const baseUrl = this.configService.get<string>('STATS_SQUAD_API_URL');
    const url = `${baseUrl}?team_id=br:team:${teamId}`;
    const response = await firstValueFrom(this.httpService.get(url));

    const data = response.data;

    const allPlayers = [
      ...(data.goalkeepers || []),
      ...(data.defenders || []),
      ...(data.midfielders || []),
      ...(data.attackers || []),
    ];

    return allPlayers.map((entry) => ({
      name: entry.player?.name || 'Unknown',
      br_id: entry.player?.id || null,
      shirt_number: entry.shirt_number ?? null,
      position: this.mapPosition(entry.position),
      country_code: entry.player?.country_code?.value || null,
    }));
  }

  async getPlayerLiveEvents(matchId: string, playerId: string): Promise<any> {
    const baseUrl = this.configService.get<string>('STATS_API_URL');
    const url = `${baseUrl}?id=br:match:${matchId}`;
    const response = await firstValueFrom(this.httpService.get(url));
    const liveEvents = response.data?.live_events || [];
    const fullPlayerId = `br:player:${playerId}`;

    const playerEvents = liveEvents.filter((event) => {
      const primaryId = event.primary?.player_id?.value;
      const secondaryId = event.secondary?.player_id?.value;
      const mainId = event.main?.player_id?.value;
      return (
        primaryId === fullPlayerId ||
        secondaryId === fullPlayerId ||
        mainId === fullPlayerId
      );
    });
    return playerEvents.map((event) => ({
      Player: event.primary?.text?.val || null,
      Minute: event.minute?.value ?? null,
      Stat: LiveEventType[event.type] || `UNKNOWN (${event.type})`,
      subtype:
        event.subtype !== undefined
          ? LiveEventSubtype[event.subtype] || `UNKNOWN (${event.subtype})`
          : null,
    }));
  }

  async getPlayerMatchStats(matchId: string, playerId: string): Promise<any> {
    const baseUrl = this.configService.get<string>('STATS_API_URL');
    const url = `${baseUrl}?id=br:match:${matchId}`;
    const response = await firstValueFrom(this.httpService.get(url));
    const liveEvents = response.data?.live_events || [];

    const fullPlayerId = `br:player:${playerId}`;

    const playerEvents = liveEvents.filter((event) => {
      return [event.primary, event.secondary, event.main].some(
        (section) => section?.player_id?.value === fullPlayerId,
      );
    });

    const totals = {
      'Yellow Cards': 0,
      'Red Cards': 0,
      Goals: 0,
      'Own Goals': 0,
      'Shots On Target': 0,
      'Shots Off Target': 0,
      'Shots Blocked': 0,
      'Penalty Missed': 0,
    };

    playerEvents.forEach((event) => {
      switch (event.type) {
        case LiveEventType.Card:
          if (event.subtype === LiveEventSubtype.YellowCard) {
            totals['Yellow Cards']++;
          } else if (event.subtype === LiveEventSubtype.RedCard) {
            totals['Red Cards']++;
          }
          break;
        case LiveEventType.Goal:
          if (event.subtype === LiveEventSubtype.OwnGoal) {
            totals['Own Goals']++;
          } else {
            totals['Goals']++;
          }
          break;
        case LiveEventType.ShotOnTarget:
          totals['Shots On Target']++;
          break;
        case LiveEventType.ShotOffTarget:
          totals['Shots Off Target']++;
          break;
        case LiveEventType.ShotBlocked:
          totals['Shots Blocked']++;
          break;
        case LiveEventType.PenaltyMissed:
          totals['Penalty Missed']++;
          break;
      }
    });

    return totals;
  }

  async getOfferFeed(
    startDate: string,
    pageNumber = 1,
    pageSize = 10,
  ): Promise<{
    records: any[];
    total: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }> {
    const baseUrl = this.configService.get<string>('OFFER_API');
    const params = { startDate };

    const response = await axios.get(baseUrl, { params });
    const events = response.data?.data || response.data?.events || [];

    const mappedEvents = events.map((event) => {
      const [homeName, awayName] = (event.matchName || 'Unknown·Unknown').split(
        '·',
      );
      return {
        eventName: event.matchName || 'Unknown',
        homeTeamName: homeName?.trim() || 'Unknown',
        awayTeamName: awayName?.trim() || 'Unknown',
        startDate: event.matchDate || event.utcDate || null,
        betRadarId: event.betradarId || null,
      };
    });

    const total = mappedEvents.length;
    const start = (pageNumber - 1) * pageSize;
    const records = mappedEvents.slice(start, start + pageSize);

    return {
      records,
      total,
      pageNumber,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  private mapPosition(positionCode: number): string {
    switch (positionCode) {
      case 1:
        return 'Goalkeeper';
      case 2:
        return 'Defender';
      case 3:
        return 'Midfielder';
      case 4:
        return 'Forward';
      default:
        return 'Unknown';
    }
  }
}
