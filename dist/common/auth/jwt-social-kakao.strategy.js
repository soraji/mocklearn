"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtKakaoStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
class JwtKakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, "kakao") {
    constructor() {
        super({
            clientID: "f2c94e7cc2f549a0db090dede025a730",
            clientSecret: "f4vzVScL1mDshpPLXUgXvBwa7qmwgY4z",
            callbackURL: "http://localhost:3000/login/kakao",
            scope: ['account_email', 'profile_nickname']
        });
    }
    async validate(accessToken, refreshToken, profile) {
        return {
            name: profile.displayName,
            email: profile._json.kakao_account.email,
            password: profile.id,
        };
    }
}
exports.JwtKakaoStrategy = JwtKakaoStrategy;
//# sourceMappingURL=jwt-social-kakao.strategy.js.map