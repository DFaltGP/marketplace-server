import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsArray()
  products: { id: string; quantity: number }[];
}
