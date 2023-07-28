import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, createProductDto: CreateProductDto) {
    const { id } = user;

    const userStoreId = await this.prisma.user.findFirst({
      where: { id },
      select: { Store: { select: { id: true } } },
    });

    if (!userStoreId.Store[0]) {
      throw new BadRequestException({
        message: 'Nenhuma loja atribuida ao usuário atual',
      });
    }

    const products = await this.prisma.product.findMany();

    const nameAlreadyInUse = products.some(
      (product) => createProductDto.name === product.name,
    );

    if (nameAlreadyInUse) {
      throw new BadRequestException({
        message: 'Nome do produto já cadastrado',
      });
    }

    const data = {
      ...createProductDto,
      Store: { connect: { id: userStoreId.Store[0].id } },
    };

    const createdProduct = await this.prisma.product.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        amount: true,
        price: true,
        imageUrl: true,
      },
    });

    return createdProduct;
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        amount: true,
        Store: {
          select: {
            id: true,
            name: true,
            User: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return products;
  }

  async findByStore(user: User) {
    const { id } = user;

    const storeOwnerUser = await this.prisma.user.findUnique({
      where: { id },
      select: {
        Store: {
          select: {
            id: true,
            name: true,
            Product: {
              select: {
                id: true,
                name: true,
                description: true,
                amount: true,
                price: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!storeOwnerUser) {
      throw new BadRequestException({ message: 'Usuário não encontrado' });
    }

    return storeOwnerUser;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        amount: true,
        Store: {
          select: {
            id: true,
            name: true,
            User: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar o produto',
      });
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        amount: true,
        Store: {
          select: {
            id: true,
            name: true,
            User: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar o produto',
      });
    }

    const data = { ...updateProductDto };

    const updatedProduct = await this.prisma.product.update({
      data,
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        amount: true,
        Store: {
          select: {
            id: true,
            name: true,
            User: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar o produto',
      });
    }

    await this.prisma.product.delete({ where: { id } });

    return { message: 'Produto deletado com sucesso' };
  }
}
