import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken
} from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  getAccessToken({ user }): string {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2w' }
    );
    return accessToken;
  }

  setRefreshToken({ user, res, req }: IAuthServiceSetRefreshToken): string {
    const refreshToken = this.jwtService.sign(
      { role: user.role, sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' }
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.yoramyoram-backend.shop; SameSite=None; Secure; httpOnly;`
    );

    console.log(user.role);
    return refreshToken;
  }

  async OAuthLogin({ req, res }) {
    let user = await this.userService.findUserByEmail({
      email: req.user.email
    });
    if (!user) user = await this.userService.create({ ...req.user });

    this.setRefreshToken({ user, res, req });
    res.redirect(
      'http://localhost:5501/main-project/frontend/login/index.html'
    );
  }
}
