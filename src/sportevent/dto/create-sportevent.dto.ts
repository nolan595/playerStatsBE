import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  IsJSON,
} from 'class-validator';

export class CreateSportEventDto {
  @IsString()
  name: string;

  @IsInt()
  externalId: number;

  @IsOptional()
  @IsJSON()
  externalData?: any;

  @IsDateString()
  startDate: string;

  @IsInt()
  homeTeamId: number;

  @IsInt()
  awayTeamId: number;
}
