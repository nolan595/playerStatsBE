import { Module } from '@nestjs/common';
import { SuperbetApiService } from './superbet-api.service';
import { SuperbetApiController } from './superbet-api.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [SuperbetApiController],
  providers: [SuperbetApiService],
})
export class SuperbetApiModule {}
