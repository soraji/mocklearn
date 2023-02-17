"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAccessStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_KEY,
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
exports.JwtAccessStrategy = JwtAccessStrategy;
//# sourceMappingURL=jwt-access.strategy.js.map