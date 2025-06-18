import { Test, TestingModule } from '@nestjs/testing';
import { SporteventService } from './sportevent.service';

describe('SporteventService', () => {
  let service: SporteventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SporteventService],
    }).compile();

    service = module.get<SporteventService>(SporteventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
