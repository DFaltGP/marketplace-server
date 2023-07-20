import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccessDto } from './dto/create-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Access } from './models/access';

@Injectable()
export class AccessService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAccessDto: CreateAccessDto): Promise<Access> {
    const data = { ...createAccessDto };

    const access = await this.prisma.access.create({
      data,
      select: { id: true, name: true },
    });

    return access;
  }

  findAll(): Promise<Access[]> {
    return this.prisma.access.findMany({ select: { id: true, name: true } });
  }

  async findOne(id: string): Promise<Access> {
    const access = await this.prisma.access.findFirst({
      where: { id },
      select: { id: true, name: true },
    });
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

  async remove(id: string): Promise<{ message: string }> {
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
