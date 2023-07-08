import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProcuctsModule } from './procucts/procucts.module';

@Module({
  imports: [UserModule, ProcuctsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
