import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccessModule } from './access/access.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UserAccessModule } from './user-access/user-access.module';
import { AccessAuthGuard } from './auth/guards/access-auth.guard';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    UserModule,
    AccessModule,
    StoreModule,
    ProductModule,
    AuthModule,
    PrismaModule,
    UserAccessModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
      // O guardião JWT será inserido a nivel global da aplicação como Provider e importará o arquivo JwtAuthGuard(Boilerplate)
      // Ele valida todos os controllers abaixo do AppModule e verifica se possuem o TokenJwt válido para acessarem as rotas
    },
    {
      provide: APP_GUARD,
      useClass: AccessAuthGuard,
    },
  ],
})
export class AppModule {}
