import { Test, TestingModule } from '@nestjs/testing';
import { ProcuctsService } from './procucts.service';

describe('ProcuctsService', () => {
  let service: ProcuctsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcuctsService],
    }).compile();

    service = module.get<ProcuctsService>(ProcuctsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
