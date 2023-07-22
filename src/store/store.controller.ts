import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Access } from 'src/auth/decorators/access.decorator';
import { Accessess } from 'src/auth/enums/accessess.enum';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Access(Accessess.Vendedor)
  @Post()
  create(@CurrentUser() user: User, @Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(user, createStoreDto);
  }

  @Access(Accessess.Admnistrador)
  @Get('all')
  findAll() {
    return this.storeService.findAll();
  }

  @Access(Accessess.Vendedor)
  @Get()
  findOne(@CurrentUser() user: User) {
    return this.storeService.findOne(user);
  }

  @Access(Accessess.Vendedor)
  @Patch()
  update(@CurrentUser() user: User, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(user, updateStoreDto);
  }

  @Access(Accessess.Admnistrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
