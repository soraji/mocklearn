"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class JwtGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, "google") {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["email", "profile"],
        });
    }
    validate(accessToken, refreshToken, profile) {
        return {
            name: profile.displayName,
            email: profile.emails[0].value,
            hashedPassword: '1234',
        };
    }
}
exports.JwtGoogleStrategy = JwtGoogleStrategy;
//# sourceMappingURL=jwt-social-google.strategy.js.map