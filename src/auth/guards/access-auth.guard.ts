import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserAccessService } from 'src/user-access/user-access.service';
import { AuthRequest } from '../models/AuthRequest';
import { Reflector } from '@nestjs/core';
import { Accessess } from '../enums/accessess.enum';
import { ACCESS_KEY } from '../decorators/access.decorator';

@Injectable()
export class AccessAuthGuard implements CanActivate {
  constructor(
    private readonly userAccessService: UserAccessService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAccessess = this.reflector.getAllAndOverride<Accessess[]>(
      ACCESS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredAccessess) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthRequest>();

    const userAccessess = await this.userAccessService.findOne(user.id);

    return requiredAccessess.some((access) => {
      return userAccessess.Access.name == access;
    });
  }
}
