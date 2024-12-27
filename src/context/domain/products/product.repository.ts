import { Product } from './product.entity';

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  find(): Promise<Product[]>;
  delete(id: string): Promise<void>;
  findOne(id: string): Promise<Product | null>;
  update(id: string, product: Product): Promise<Product>;
}
