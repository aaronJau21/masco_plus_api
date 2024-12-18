import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/context/application/auth/guards/auth/user.guard';
import { BrandService } from 'src/context/application/brand/brand.service';
import { BrandCreateDto } from 'src/context/application/brand/dtos/brand-request.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@Body() dto: BrandCreateDto) {
    return await this.brandService.createBrand(dto);
  }

  @Get(':name')
  async getBrandByName(@Body('name') name: string) {
    return await this.brandService.getBrandByName(name);
  }

  @UseGuards(UserGuard)
  @Get()
  async getBrands() {
    return await this.brandService.getBrands();
  }
}
