import { Injectable } from '@nestjs/common';
import { CreateSportEventDto } from './dto/create-sportevent.dto';
import { UpdateSporteventDto } from './dto/update-sportevent.dto';
import { PrismaService } from 'src/database/prisma.service';
import { readdirSync, readFileSync } from 'fs';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SporteventService {
  constructor(
    private prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  create(createSporteventDto: CreateSportEventDto) {
    return this.prismaService.sportEvent.create({
      data: createSporteventDto,
    });
  }

  retrieveFromOffer(fileName: string) {
    const filePath = path.join(
      __dirname,
      '../../src/data/Offer Data/',
      fileName,
    );
    const fileContents = readFileSync(filePath, 'utf-8');
    const offerData = JSON.parse(fileContents);

    return offerData.data.map((event) => {
      const matchName = event.matchName;
      const [homeTeamName, awayTeamName] = matchName.split('.');

      return {
        eventName: matchName,
        homeTeamName: homeTeamName?.trim(),
        awayTeamName: awayTeamName?.trim(),
        startDate: event.matchDate,
      };
    });
  }

  retrieveOfferFiles() {
    const dirPath = path.join(__dirname, '../../src/data/Offer Data');
    const files = readdirSync(dirPath);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    return jsonFiles;
  }

  async getStats(eventId: string): Promise<any> {
    const apiStatsHost = 'https://api.production.stats.superbet.com';
    const applicationVariant = 'rosuperbetsport';
    const url = `${apiStatsHost}/soccer/event/detail/${applicationVariant}/ro?id=br:match:${eventId}`;

    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  findAll() {
    return this.prismaService.sportEvent.findMany();
  }

  findOne(id: number) {
    return this.prismaService.sportEvent.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateSporteventDto: UpdateSporteventDto) {
    return this.prismaService.sportEvent.update({
      where: { id },
      data: updateSporteventDto,
    });
  }

  remove(id: number) {
    return this.prismaService.sportEvent.delete({
      where: { id },
    });
  }
}
