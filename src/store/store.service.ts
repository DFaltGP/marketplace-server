import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
// import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStoreDto } from './dto/update-store.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createStoreDto: CreateStoreDto) {
    const { id } = user;

    const userInfo = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, Store: {} },
    });

    if (!userInfo) {
      throw new BadRequestException({ message: 'Usuário inexistente' });
    }

    if (userInfo.Store[0]) {
      throw new BadRequestException({
        message: 'Este usuário já possui uma loja registrada em seu nome',
      });
    }

    const data = { ...createStoreDto, User: { connect: { id } } };

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

  async findOne(user: User) {
    const { id } = user;
    const userStore = await this.prisma.user.findUnique({
      where: { id },
      select: {
        Store: { select: { id: true } },
      },
    });

    if (!userStore) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar esta loja',
      });
    }

    return userStore;
  }

  async update(user: User, updateStoreDto: UpdateStoreDto) {
    const { id } = user;

    const userStore = await this.prisma.user.findUnique({
      where: { id },
      select: {
        Store: { select: { id: true } },
      },
    });

    if (!userStore.Store[0].id) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar a loja',
      });
    }

    const data = { ...updateStoreDto };

    const updatedStore = await this.prisma.store.update({
      data,
      where: { id: userStore.Store[0].id },
      select: {
        id: true,
        name: true,
        User: { select: { id: true, name: true } },
      },
    });

    return updatedStore;
  }

  async remove(id: string): Promise<{ message: string }> {
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
