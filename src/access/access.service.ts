import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccessService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAccessDto: CreateAccessDto) {
    const data = { ...createAccessDto };

    const access = await this.prisma.access.create({ data });

    return access;
  }

  findAll() {
    return this.prisma.access.findMany();
  }

  async findOne(id: string) {
    const access = await this.prisma.access.findFirst({ where: { id } });
    if (!access) {
      throw new BadRequestException({
        message: 'Access level does not exists',
      });
    }
    return access;
  }

  async update(id: string, updateAccessDto: UpdateAccessDto) {
    const access = await this.prisma.access.findFirst({ where: { id } });
    if (!access) {
      throw new BadRequestException({
        message: 'Access level does not exists',
      });
    }
    const data = { ...updateAccessDto };
    const updatedAccess = await this.prisma.access.update({
      where: { id },
      data,
    });
    return updatedAccess;
  }

  async remove(id: string) {
    const access = await this.prisma.access.findFirst({ where: { id } });
    if (!access) {
      throw new BadRequestException({
        message: 'Access level does not exists',
      });
    }
    await this.prisma.access.delete({ where: { id } });
    return { message: 'Access level has been deleted' };
  }
}
