import { IsInt, IsNumber, IsString, MaxLength } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsString()
  name: string;

  @IsString()
  @MaxLength(100)
  description: string;

  @IsNumber()
  price: number;

  @IsInt()
  amount: number;

  @IsString()
  imageUrl: string;
}
