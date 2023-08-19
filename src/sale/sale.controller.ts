import { Controller, Post, Body, Get } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Access } from 'src/auth/decorators/access.decorator';
import { Accessess } from 'src/auth/enums/accessess.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Access(Accessess.Comprador)
  @Post()
  create(@CurrentUser() user: User, @Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(user, createSaleDto);
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }
}
