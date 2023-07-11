import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, accessName } = createUserDto;

    const access = await this.prisma.access.findMany({
      where: { name: accessName },
    });

    if (access.length === 0) {
      throw new BadRequestException({ message: 'Access does not exists' });
    }

    const emailAlreadyInUse = await this.prisma.user.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new BadRequestException({ message: 'Email already in use' });
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      UserAccess: { create: { Access: { connect: { name: accessName } } } },
      accessName: undefined,
    };

    const createdUser = await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        UserAccess: {
          select: {
            Access: { select: { name: true } },
          },
        },
      },
    });

    return createdUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        UserAccess: { select: { Access: { select: { name: true } } } },
      },
    });

    return users;
  }

  // async findByEmail(email: string) {
  //   const userExists = await this.prisma.user.findUnique({ where: { email } });
  //   if (!userExists) {
  //     throw new BadRequestException({ message: 'User does not exists' });
  //   }

  //   const user = await this.prisma.user.findUnique({ where: { email } });

  //   return {
  //     ...user,
  //     password: undefined,
  //   };
  // }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.prisma.user.findFirst({ where: { id } });

    if (!userExists) {
      throw new BadRequestException({ message: 'User does not exists' });
    }

    const data = { ...updateUserDto };

    const updatedUser = await this.prisma.user.update({
      data,
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        number: true,
        cep: true,
        city: true,
        UserAccess: {
          select: { Access: { select: { name: true } } },
        },
      },
    });

    return updatedUser;
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findFirst({ where: { id } });

    if (!userExists) {
      throw new BadRequestException({ message: 'User does not exists' });
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'User has been deleted' };
  }
}
