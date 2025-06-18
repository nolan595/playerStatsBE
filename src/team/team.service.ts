import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prismaService: PrismaService) {}
  create(createTeamDto: CreateTeamDto) {
    return this.prismaService.team.create({
      data: createTeamDto,
    });
  }

  findAll() {
    return this.prismaService.team.findMany();
  }

  findOne(id: number) {
    return this.prismaService.team.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.prismaService.team.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  remove(id: number) {
    return this.prismaService.team.delete({
      where: { id },
    });
  }
}
