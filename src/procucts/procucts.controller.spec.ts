import { Test, TestingModule } from '@nestjs/testing';
import { ProcuctsController } from './procucts.controller';
import { ProcuctsService } from './procucts.service';

describe('ProcuctsController', () => {
  let controller: ProcuctsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcuctsController],
      providers: [ProcuctsService],
    }).compile();

    controller = module.get<ProcuctsController>(ProcuctsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
