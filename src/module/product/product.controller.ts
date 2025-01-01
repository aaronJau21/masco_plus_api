import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { UserGuard } from 'src/context/application/auth/guards/auth/user.guard';
import { CreateProductDto } from 'src/context/application/product/dtos/create-product.dto';
import { UpdateProductDto } from 'src/context/application/product/dtos/update-product.dto';
import { UpdateStatusProductDto } from 'src/context/application/product/dtos/update-status-product.dto';
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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.productService.update(id, dto);
  }

  @UseGuards(UserGuard)
  @Patch('status/:id')
  async updateStatusProduct(
    @Param('id') id: string,
    @Body() dto: UpdateStatusProductDto,
  ) {
    return await this.productService.updateStatus(id, dto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.delete(id);
  }

  @UseGuards(UserGuard)
  @Post('description/:id')
  async saveDescription(@Param('id') id: string, @Body() dto: InputJsonValue) {
    return await this.productService.saveDescription(id, dto);
  }
}
