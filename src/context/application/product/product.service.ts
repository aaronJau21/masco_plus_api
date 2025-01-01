import { Inject, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { ProductRepository } from 'src/context/domain/products/product.repository';
import { CreateProductDto } from './dtos/create-product.dto';
import { IBrandCreateResult } from './interfaces/brand-create-result.interface';
import {
  Product,
  ProductDescription,
} from 'src/context/domain/products/product.entity';
import { UpdateProductDto } from './dtos/update-product.dto';
import { UpdateStatusProductDto } from './dtos/update-status-product.dto';
import { InputJsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(data: CreateProductDto): Promise<IBrandCreateResult> {
    const { name, brand_id, status, quantity_sold } = data;

    const product = {
      id: uuidv4(),
      name,
      brand_id,
      status,
      quantity_sold,
    };

    const newProduct = await this.productRepository.save(product);

    return { product: newProduct };
  }

  async find(): Promise<{ products: Product[] }> {
    const products = await this.productRepository.find();
    return { products };
  }

  async findOne(id: string): Promise<{ product: Product }> {
    const product = await this.productRepository.findOne(id);
    return { product };
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.update(id, data);
    return product;
  }

  async updateStatus(
    id: string,
    status: UpdateStatusProductDto,
  ): Promise<{ product: Product }> {
    const product = await this.productRepository.updateStatus(id, status);
    return { product };
  }

  async delete(id: string): Promise<{ msg: string }> {
    await this.productRepository.delete(id);

    return { msg: 'Producto eliminado' };
  }

  async saveDescription(
    id: string,
    data: InputJsonValue,
  ): Promise<ProductDescription> {
    return await this.productRepository.saveDescription(id, data);
  }
}
