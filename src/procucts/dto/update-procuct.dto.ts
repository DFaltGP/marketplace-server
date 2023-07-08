import { PartialType } from '@nestjs/mapped-types';
import { CreateProcuctDto } from './create-procuct.dto';

export class UpdateProcuctDto extends PartialType(CreateProcuctDto) {}
