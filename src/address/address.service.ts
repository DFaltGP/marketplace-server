import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
// O usuário só poderá criar um endereço e se conectar à ele caso tenha um tokenJWt e seja autenticado

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, createAddressDto: CreateAddressDto) {
    const { id } = user;

    const data = { ...createAddressDto, User: { connect: { id } } };

    const userExists = await this.prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new BadRequestException({ message: 'Usuário não encontrado' });
    }

    //Caso já tenha um endereço cadastrado, não poderá conectar outro além

    const userAlreadyHaveAnAddress = await this.prisma.user.findUnique({
      where: { id },
      select: { Address: {} },
    });

    if (userAlreadyHaveAnAddress.Address.length === 1) {
      throw new BadRequestException({
        message: 'Usuário já possui um endereço cadastrado',
      });
    }

    const createdAddress = await this.prisma.address.create({ data });

    return createdAddress;
  }

  async findAll() {
    return await this.prisma.address.findMany();
  }

  async findOne(user: User) {
    const { id } = user;

    const userExists = await this.prisma.user.findUnique({ where: { id } });

    if (!userExists) {
      throw new BadRequestException({ message: 'Usuário não encontrado' });
    }

    const userAddress = await this.prisma.address.findFirst({
      where: { userId: id },
    });

    return { ...userAddress, userId: undefined };
  }

  update(user: User, updateAddressDto: UpdateAddressDto) {
    return `This action updates a  address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
