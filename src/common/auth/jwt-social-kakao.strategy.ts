import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";

export class JwtKakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor() {
    super({
      clientID: "f2c94e7cc2f549a0db090dede025a730",
      clientSecret : "f4vzVScL1mDshpPLXUgXvBwa7qmwgY4z",
      callbackURL: "http://localhost:3000/login/kakao",
      // clientID: process.env.KAKAO_CLIENT_ID,
      // clientSecret: process.env.KAKAO_CLIENT_SECRET,
      // callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email', 'profile_nickname']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // console.log('accessToken'+accessToken)
    // console.log('refreshToken'+refreshToken)
    // console.log(profile)
    // console.log(profile._json.kakao_account.email)

    return {
      name: profile.displayName,
      email: profile._json.kakao_account.email,
      password: profile.id,
    };
  }
}
