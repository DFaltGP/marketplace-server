import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [UserModule, AccessModule, StoreModule, ProductModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
      // O guardião JWT será inserido a nivel global da aplicação como Provider e importará o arquivo JwtAuthGuard(Boilerplate)
      // Ele valida todos os controllers abaixo do AppModule e verifica se possuem o TokenJwt para acessarem as rotas
    },
  ],
})
export class AppModule {}
