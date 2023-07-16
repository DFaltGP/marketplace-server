import { Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getMe(user: User) {
    const authenticatedUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        UserAccess: {
          select: { accessId: true },
        },
      },
    });
    return authenticatedUser;
    // Faça as tipagens dos retornos das funções
  }
}
