import { Brand } from './brand.entity';

export interface BrandRepository {
  save(brand: Brand): Promise<Brand>;
  findByName(name: string): Promise<Brand>;
  find(): Promise<Brand[]>;
  delete(id: string): Promise<void>;
}
