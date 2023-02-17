"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtNaverStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_naver_1 = require("passport-naver");
class JwtNaverStrategy extends (0, passport_1.PassportStrategy)(passport_naver_1.Strategy, "naver") {
    constructor() {
        super({
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            callbackURL: process.env.NAVER_CALLBACK_URL
        });
    }
    validate(accessToken, refreshToken, profile) {
        return {
            name: profile.displayName,
            email: profile._json.email,
            password: profile.id,
        };
    }
}
exports.JwtNaverStrategy = JwtNaverStrategy;
//# sourceMappingURL=jwt-social-naver.strategy.js.map