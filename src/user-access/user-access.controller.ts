import { Controller, Get } from '@nestjs/common';
import { UserAccessService } from './user-access.service';

@Controller('user-access')
export class UserAccessController {
  constructor(private readonly userAccessService: UserAccessService) {}
  @Get()
  findAll() {
    return this.userAccessService.findAll();
  }
}
