import { Test, TestingModule } from '@nestjs/testing';
import { SuperbetApiController } from './superbet-api.controller';
import { SuperbetApiService } from './superbet-api.service';

describe('SuperbetApiController', () => {
  let controller: SuperbetApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperbetApiController],
      providers: [SuperbetApiService],
    }).compile();

    controller = module.get<SuperbetApiController>(SuperbetApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
