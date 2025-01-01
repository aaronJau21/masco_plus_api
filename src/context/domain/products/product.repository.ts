import { UpdateProductDto } from 'src/context/application/product/dtos/update-product.dto';
import { Product, ProductDescription } from './product.entity';
import { UpdateStatusProductDto } from 'src/context/application/product/dtos/update-status-product.dto';
import { InputJsonValue } from '@prisma/client/runtime/library';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  find(): Promise<Product[]>;
  delete(id: string): Promise<void>;
  findOne(id: string): Promise<Product | null>;
  update(id: string, product: UpdateProductDto): Promise<Product>;
  updateStatus(id: string, status: UpdateStatusProductDto): Promise<Product>;

  // Product Description
  saveDescription(
    id: string,
    description: InputJsonValue,
  ): Promise<ProductDescription>;
}
