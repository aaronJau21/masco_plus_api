import { Inject, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { BrandRepository } from 'src/context/domain/brand/brand.repository';
import { BrandCreateDto } from './dtos/brand-request.dto';
import { Brand } from 'src/context/domain/brand/brand.entity';
import { IBrandsResult } from './interfaces/brands-result.interface';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BrandRepository')
    private readonly brandRepository: BrandRepository,
  ) {}

  async createBrand(data: BrandCreateDto) {
    const { name } = data;

    const brand = new Brand(uuidv4(), name);

    const newBrand = await this.brandRepository.save(brand);

    return newBrand;
  }

  async getBrandByName(name: string) {
    const brand = await this.brandRepository.findByName(name);

    return brand;
  }

  async getBrands(): Promise<IBrandsResult> {
    const brands = await this.brandRepository.find();

    return {
      brands: brands,
    };
  }
}
