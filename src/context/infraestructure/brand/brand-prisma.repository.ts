import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BrandRepository } from 'src/context/domain/brand/brand.repository';
import { Brand } from 'src/context/domain/brand/brand.entity';

@Injectable()
export class BrandPrismaRepository implements BrandRepository {
  private readonly logger = new Logger(BrandPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async save(brand: Brand): Promise<Brand> {
    const name = await this.prisma.brand.findFirst({
      where: {
        name: brand.name,
      },
    });

    if (name) {
      this.logger.error('La Marca ya existe');
      throw new BadRequestException('La Marca ya existe');
    }

    const newBrand = await this.prisma.brand.create({
      data: brand,
    });

    return newBrand;
  }

  async findByName(name: string): Promise<Brand> {
    const brand = await this.prisma.brand.findFirst({
      where: {
        name,
      },
    });

    if (brand === null)
      throw new NotFoundException(`La Marca ${name} no existe`);

    return brand;
  }

  async find(): Promise<Brand[]> {
    const brands = await this.prisma.brand.findMany();

    return brands;
  }

  async delete(id: string): Promise<void> {
    const brand = await this.prisma.brand.findFirst({
      where: {
        id,
      },
    });

    if (brand === null) throw new NotFoundException(`La Marca no existe`);

    await this.prisma.brand.delete({ where: { id: brand.id } });
  }
}
