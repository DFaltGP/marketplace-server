import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
// import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, createStoreDto: CreateStoreDto) {
    const data = { ...createStoreDto, User: { connect: { id: userId } } };

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new BadRequestException({ message: 'Usuário inexistente' });
    }

    const createdStore = await this.prisma.store.create({
      data,
      select: {
        id: true,
        name: true,
        User: {
          select: { name: true },
        },
      },
    });

    return createdStore;
  }

  async findAll() {
    const stores = await this.prisma.store.findMany({
      select: {
        id: true,
        name: true,
        User: { select: { name: true } },
        Product: {
          select: {
            name: true,
            description: true,
            price: true,
            amount: true,
            imageUrl: true,
          },
        },
      },
    });

    return stores;
  }

  async findOne(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        User: { select: { name: true } },
      },
    });

    if (!store) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar esta loja',
      });
    }

    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar a loja',
      });
    }

    const data = { ...updateStoreDto };

    const updatedStore = await this.prisma.store.update({
      data,
      where: { id },
      select: {
        id: true,
        name: true,
        User: { select: { id: true, name: true } },
      },
    });

    return updatedStore;
  }

  async remove(id: string) {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar a loja',
      });
    }

    await this.prisma.store.delete({ where: { id } });

    return { message: 'Loja deletada com sucesso' };
  }
}
