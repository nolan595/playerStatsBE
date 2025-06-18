import { IsInt, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsInt()
  externalId: number;

  @IsString()
  name: string;
}
