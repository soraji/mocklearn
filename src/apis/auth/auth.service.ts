import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import {
  IAuthServiceGetAccessToken,
  IAuthServiceSetRefreshToken,
} from "./interfaces/auth-service.interface";

@Injectable()
export class AuthService{
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}


  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    const accessToken = this.jwtService.sign(
      { email: user.email, sub: user.id, role: user.role },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: "2w" }
      );
    return accessToken;
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id , role: user.role},
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: "1h" }
    );

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`)

    // 배포환경에서 연습 배포때

    //실제 배포때
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`)
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
  }

  async OAuthLogin({req, res}){
    let user = await this.userService.findUserByEmail({ email: req.user.email });
    if (!user) user = await this.userService.create({ ...req.user });

    this.setRefreshToken({ user, res });
    res.redirect(
      "http://localhost:5501/main-project/frontend/login/index.html"
    );
  }
}