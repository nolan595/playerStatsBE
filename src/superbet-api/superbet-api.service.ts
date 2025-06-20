import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

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
