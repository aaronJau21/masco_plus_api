import { Decimal } from '@prisma/client/runtime/library';

export class Product {
  constructor(
    public id: string,
    public name: string,
    public brand_id: string,
    public status: boolean,
    public quantity_sold: number,
    public descuento?: number,
    public stock?: number,
    public description?: string,
    public price?: Decimal,
  ) {}
}
