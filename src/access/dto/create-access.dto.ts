import { IsNotEmpty, IsString } from 'class-validator';
import { Access } from '../entities/access.entity';

export class CreateAccessDto extends Access {
  @IsString()
  @IsNotEmpty()
  name: string;
}
