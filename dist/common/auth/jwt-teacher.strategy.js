"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTeacherStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const common_1 = require("@nestjs/common");
class JwtTeacherStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'teacher') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
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
        }
        else {
            throw new common_1.ConflictException('관리권한이 없습니다');
        }
        return result;
    }
}
exports.JwtTeacherStrategy = JwtTeacherStrategy;
//# sourceMappingURL=jwt-teacher.strategy.js.map