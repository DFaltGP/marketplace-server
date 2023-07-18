import { SetMetadata } from '@nestjs/common';
import { Accessess } from '../enums/accessess.enum';

export const ACCESS_KEY = 'access';
export const Access = (...access: Accessess[]) =>
  SetMetadata(ACCESS_KEY, access);
