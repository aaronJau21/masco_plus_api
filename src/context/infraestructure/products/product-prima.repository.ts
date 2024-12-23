import { Product } from 'src/context/domain/products/product.entity';
import { ProductRepository } from 'src/context/domain/products/product.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(product: Product): Promise<Product> {
    const newProduct = await this.prisma.products.create({
      data: product,
    });

    return newProduct;
  }

  async find(): Promise<Product[]> {
    const products = await this.prisma.products.findMany({
      include: {
        Brand: true,
      },
    });

    return products;
  }

  async delete(id: string): Promise<void> {
    const product = await this.prisma.products.findFirst({ where: { id } });
    if (product === null) throw new NotFoundException('No existe el producto');
    await this.prisma.products.delete({ where: { id: id } });
  }
}
