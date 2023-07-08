import { Module } from '@nestjs/common';
import { ProcuctsService } from './procucts.service';
import { ProcuctsController } from './procucts.controller';

@Module({
  controllers: [ProcuctsController],
  providers: [ProcuctsService]
})
export class ProcuctsModule {}
