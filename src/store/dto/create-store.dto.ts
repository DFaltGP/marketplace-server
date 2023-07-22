import { IsString, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(4)
  name: string;
}
