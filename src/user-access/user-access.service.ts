import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const userAccess = await this.prisma.userAccess.findMany();
    return userAccess;
  }

  async findOne(id: string) {
    const userAccessExists = await this.prisma.userAccess.findFirst({
      where: { userId: id },
      select: { Access: { select: { name: true } } },
    });

    if (!userAccessExists) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar o usuário',
      });
    }

    return userAccessExists;
  }
}
