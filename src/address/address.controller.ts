import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Access } from 'src/auth/decorators/access.decorator';
import { Accessess } from 'src/auth/enums/accessess.enum';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressService.create(user, createAddressDto);
  }

  @Access(Accessess.Admnistrador)
  @Get('all')
  findAll() {
    return this.addressService.findAll();
  }

  @Get()
  findOne(@CurrentUser() user: User) {
    return this.addressService.findOne(user);
  }

  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(user, updateAddressDto);
  }
}
