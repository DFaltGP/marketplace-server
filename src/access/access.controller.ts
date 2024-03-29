import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { Access } from 'src/auth/decorators/access.decorator';
import { Accessess } from 'src/auth/enums/accessess.enum';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Access(Accessess.Admnistrador)
  @Post()
  create(@Body() createAccessDto: CreateAccessDto) {
    return this.accessService.create(createAccessDto);
  }

  @Access(Accessess.Admnistrador, Accessess.Comprador)
  @Get()
  findAll() {
    return this.accessService.findAll();
  }

  @Access(Accessess.Admnistrador)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessService.findOne(id);
  }

  @Access(Accessess.Admnistrador)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessDto: UpdateAccessDto) {
    return this.accessService.update(id, updateAccessDto);
  }

  @Access(Accessess.Admnistrador)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessService.remove(id);
  }
}
