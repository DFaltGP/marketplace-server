import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new UnauthorizedException({
      message: 'Email ou senha não correspondem',
    });
  }

  async login(user: User): Promise<UserToken> {
    // Transforma o req.user em um JWT após passar
    // pela estratégia local(header, payload[id, name||email, iat(issued_AT)] e verifySignature)
    const payload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const jwtToken = await this.jwtService.signAsync(payload);
    // serviço de criação do token requer apenas o Payload
    return { access_token: jwtToken };
  }
}
