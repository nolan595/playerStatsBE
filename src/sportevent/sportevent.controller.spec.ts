import { Test, TestingModule } from '@nestjs/testing';
import { SporteventController } from './sportevent.controller';
import { SporteventService } from './sportevent.service';

describe('SporteventController', () => {
  let controller: SporteventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SporteventController],
      providers: [SporteventService],
    }).compile();

    controller = module.get<SporteventController>(SporteventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
