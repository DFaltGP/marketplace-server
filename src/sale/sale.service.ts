import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { async } from 'rxjs';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(user: User, createSaleDto: CreateSaleDto) {
    const { products } = createSaleDto;

    // Busque os produtos selecionados na requisição no banco de dados usando o Prisma
    const productsByDatabase = await this.prisma.product.findMany({
      where: {
        id: {
          in: products.map((product) => product.id),
        },
      },
    });

    // Estude a constante abaixo e o For para calcular o total

    const productWithQuantity = productsByDatabase.map((product) => {
      const { id, name, price } = product;
      const quantity = products.find((p) => p.id === product.id).quantity;
      return { id, name, price, quantity };
    });

    const storeIdByProduct = productsByDatabase.map(
      (product) => product.storeId,
    );

    let total = 0;

    for (const product of productWithQuantity) {
      total += product.price * product.quantity;
    }

    const userIdByStore = await this.prisma.store.findMany({
      where: { id: { in: storeIdByProduct } },
      select: { User: true },
    });

    const sellersIds = userIdByStore.map((seller) => seller.User.id);

    // const sale = await this.prisma.sale.create({
    //   data: {
    //     total,
    //     Buyer: { connect: { id: user.id } },
    //     // Seller KRL QUE DIFICULDADE!
    //   },
    // });

    //Vai ter que ser na base do foreach no array produtos, para cada 1 crie uma venda relacionada

    return sellersIds;
  }

  async findAll() {
    return await this.prisma.sale.findMany();
  }
}
