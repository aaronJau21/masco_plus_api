import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { PrismaService } from 'src/context/infraestructure/prisma/prisma.service';
import { BrandService } from 'src/context/application/brand/brand.service';
import { BrandPrismaRepository } from 'src/context/infraestructure/brand/brand-prisma.repository';

@Module({
  controllers: [BrandController],
  providers: [
    PrismaService,
    BrandService,
    { provide: 'BrandRepository', useClass: BrandPrismaRepository },
  ],
})
export class BrandModule {}
