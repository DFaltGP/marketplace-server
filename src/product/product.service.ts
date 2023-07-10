import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Store } from 'src/store/entities/store.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(storeId: string, createProductDto: CreateProductDto) {
    const storeExists = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!storeExists) {
      throw new BadRequestException({
        message: 'Não foi possível encontrar a loja',
      });
    }

    const data = {
      ...createProductDto,
      Store: { connect: { id: storeId } },
    };

    const createdProduct = await this.prisma.product.create({ data });

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
