import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsUUID()
  brand_id: string;

  @IsBoolean()
  status: boolean;

  @IsNumber()
  quantity_sold: number;
}
