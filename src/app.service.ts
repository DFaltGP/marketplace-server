import { Injectable } from '@nestjs/common';
import { User } from './user/entities/user.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getMe(user: User) {
    return user;
  }
}
