import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { LiveEventType, LiveEventSubtype } from './enum/stats-types.enum';

@Injectable()
export class SuperbetApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getMatchStats(eventId: string): Promise<any> {
    const baseUrl = this.configService.get<string>('STATS_API_URL');
    const url = `${baseUrl}?id=br:match:${eventId}`;
    const response = await firstValueFrom(this.httpService.get(url));
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

  async getPlayerMatchStats(matchId: string, playerId: string): Promise<any> {
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
      minute: event.minute?.value ?? null,
      added_time: event.added_time?.value ?? null,
      type: LiveEventType[event.type] || `UNKNOWN (${event.type})`,
      subtype:
        event.subtype !== undefined
          ? LiveEventSubtype[event.subtype] || `UNKNOWN (${event.subtype})`
          : null,
      primary_player: event.primary?.text?.val || null,
      secondary_player: event.secondary?.text?.args?.join(' ') || null,
      description: event.main?.text?.args?.join(' ') || null,
    }));
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
