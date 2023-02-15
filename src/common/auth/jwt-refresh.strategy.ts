import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        // console.log(req);
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace("refreshToken=",'');
        return refreshToken;
      },
      secretOrKey: process.env.JWT_REFRESH_KEY,
    });
  }

  validate(payload) {
    return {
      email: payload.email,
      id: payload.sub,
      role: payload.role
    };
  }
}
