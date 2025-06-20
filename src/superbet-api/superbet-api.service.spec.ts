import { Test, TestingModule } from '@nestjs/testing';
import { SuperbetApiService } from './superbet-api.service';

describe('SuperbetApiService', () => {
  let service: SuperbetApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperbetApiService],
    }).compile();

    service = module.get<SuperbetApiService>(SuperbetApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
