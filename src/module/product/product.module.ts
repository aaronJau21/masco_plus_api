import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/context/infraestructure/prisma/prisma.service';
import { ProductService } from 'src/context/application/product/product.service';
import { ProductPrismaRepository } from 'src/context/infraestructure/products/product-prima.repository';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    ProductService,
    { provide: 'ProductRepository', useClass: ProductPrismaRepository },
  ],
  exports: [ProductService],
})
export class ProductModule {}
