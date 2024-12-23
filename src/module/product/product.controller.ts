import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/context/application/auth/guards/auth/user.guard';
import { CreateProductDto } from 'src/context/application/product/dtos/create-product.dto';
import { ProductService } from 'src/context/application/product/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(UserGuard)
  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @UseGuards(UserGuard)
  @Get()
  async find() {
    return await this.productService.find();
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
