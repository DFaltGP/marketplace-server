import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccessService } from 'src/access/access.service';
import { UserAccessService } from 'src/user-access/user-access.service';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(
    private readonly userAccessService: UserAccessService,
    private readonly accessService: AccessService,
  ) {}
  async canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredAccess = await this.accessService.findAll();
    // PEGUE OS ACESSOS E CRIE SEU CUSTOM DECORATOR, LOGO EM SEGUIDA COMPARE SE O REQ.USER.ID ESTÁ ASSOCIADO
    // HÁ ALGUMA DAS PERMISSOES DA CONST REQUIREDACCESS E RETORNE TRUE OR FALSE PARA LIBERAR O GUARDIÃO
  }
}
