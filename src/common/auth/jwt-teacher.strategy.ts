import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';

export class JwtTeacherStrategy extends PassportStrategy(Strategy, 'teacher') {
  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {

    let result;
    if (payload.role === 'TEACHER') {
      result = {
        role: payload.role,
        id: payload.sub,
        exp: payload.exp,
      };
    } else {
      throw new ConflictException('관리권한이 없습니다');
    }
    return result;
  }
}
