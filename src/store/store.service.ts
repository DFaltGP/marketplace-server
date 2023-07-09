import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
// import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  // findAll() {
  //   return `This action returns all store`;
  // }

  // findOne(userId: string) {
  //   return `This action returns a #userId store`;
  // }

  // update(userId: string, updateStoreDto: UpdateStoreDto) {
  //   return `This action updates a #userId store`;
  // }

  // remove(userId: string) {
  //   return `This action removes a #userId store`;
  // }
}
