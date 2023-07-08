import { Injectable } from '@nestjs/common';
import { CreateProcuctDto } from './dto/create-procuct.dto';
import { UpdateProcuctDto } from './dto/update-procuct.dto';

@Injectable()
export class ProcuctsService {
  create(createProcuctDto: CreateProcuctDto) {
    return 'This action adds a new procuct';
  }

  findAll() {
    return `This action returns all procucts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procuct`;
  }

  update(id: number, updateProcuctDto: UpdateProcuctDto) {
    return `This action updates a #${id} procuct`;
  }

  remove(id: number) {
    return `This action removes a #${id} procuct`;
  }
}
