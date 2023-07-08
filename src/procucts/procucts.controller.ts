import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcuctsService } from './procucts.service';
import { CreateProcuctDto } from './dto/create-procuct.dto';
import { UpdateProcuctDto } from './dto/update-procuct.dto';

@Controller('procucts')
export class ProcuctsController {
  constructor(private readonly procuctsService: ProcuctsService) {}

  @Post()
  create(@Body() createProcuctDto: CreateProcuctDto) {
    return this.procuctsService.create(createProcuctDto);
  }

  @Get()
  findAll() {
    return this.procuctsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procuctsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcuctDto: UpdateProcuctDto) {
    return this.procuctsService.update(+id, updateProcuctDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procuctsService.remove(+id);
  }
}
