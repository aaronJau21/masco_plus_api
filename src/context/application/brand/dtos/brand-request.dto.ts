import { IsString } from 'class-validator';

export class BrandCreateDto {
  @IsString()
  name: string;
}
