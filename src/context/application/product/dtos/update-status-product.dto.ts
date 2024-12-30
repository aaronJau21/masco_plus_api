import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean } from 'class-validator';

export class UpdateStatusProductDto extends PartialType(CreateProductDto) {
  @IsBoolean()
  status: boolean;
}
