import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/context/application/auth/guards/auth/user.guard';
import { BrandService } from 'src/context/application/brand/brand.service';
import { BrandCreateDto } from 'src/context/application/brand/dtos/brand-request.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @UseGuards(UserGuard)
  @Post()
  async createBrand(@Body() dto: BrandCreateDto) {
    return await this.brandService.createBrand(dto);
  }

  @UseGuards(UserGuard)
  @Get(':name')
  async getBrandByName(@Body('name') name: string) {
    return await this.brandService.getBrandByName(name);
  }

  @UseGuards(UserGuard)
  @Get()
  async getBrands() {
    return await this.brandService.getBrands();
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return await this.brandService.deleteBrand(id);
  }
}
