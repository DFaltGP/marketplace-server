import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, AccessModule, StoreModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
