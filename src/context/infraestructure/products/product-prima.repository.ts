import {
  Product,
  ProductDescription,
} from 'src/context/domain/products/product.entity';
import { ProductRepository } from 'src/context/domain/products/product.repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from 'src/context/application/product/dtos/update-product.dto';
import { UpdateStatusProductDto } from 'src/context/application/product/dtos/update-status-product.dto';
import { InputJsonValue } from '@prisma/client/runtime/library';

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

  async findOne(id: string): Promise<Product | null> {
    const product = await this.prisma.products.findFirst({ where: { id } });
    if (product === null) throw new NotFoundException('No existe el producto');
    return product;
  }

  async delete(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (product === null) throw new NotFoundException('No existe el producto');
    await this.prisma.products.delete({ where: { id: id } });
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    if (product === null) throw new NotFoundException('No existe el producto');

    const updatedProduct = await this.prisma.products.update({
      where: { id },
      data,
    });

    return updatedProduct;
  }

  async updateStatus(
    id: string,
    status: UpdateStatusProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (product === null) throw new NotFoundException('No existe el producto');

    const updatedProduct = this.prisma.products.update({
      where: { id },
      data: status,
    });

    return updatedProduct;
  }

  // Product Description
  async saveDescription(
    id: string,
    data: InputJsonValue,
  ): Promise<ProductDescription> {
    const product = await this.findOne(id);
    if (product === null) throw new NotFoundException('No existe el producto');

    const description = await this.prisma.productDescription.create({
      data: {
        product_id: id,
        description: data,
      },
    });

    return description;
  }
}
