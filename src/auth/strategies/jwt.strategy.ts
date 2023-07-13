import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // A parte herdada de PassportStrategy(Startegy[from passport-jwt]) extrai o token como BearerToken

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  // Assim, a função validate abaixo apenas recebe o param payload do tipo UserPayload e retorna as
  async validate(payload: UserPayload): Promise<UserFromJwt> {
    // Informações do usuário convertidas do payload para de fato User(sub=id,name=name,email=email)

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
