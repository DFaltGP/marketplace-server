import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const emailAlreadyInUse = await this.prisma.user.findUnique({
      where: { email },
    });

    if (emailAlreadyInUse) {
      throw new BadRequestException({ message: 'Email already in use' });
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    users.forEach((user) => {
      user.password = undefined;
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
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  async remove(id: string) {
    const userExists = await this.prisma.user.findFirst({ where: { id } });

    if (!userExists) {
      throw new BadRequestException({ message: 'User does not exists' });
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
