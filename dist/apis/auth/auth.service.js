"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    getAccessToken({ user }) {
        const accessToken = this.jwtService.sign({ email: user.email, sub: user.id, role: user.role }, { secret: process.env.JWT_ACCESS_KEY, expiresIn: "2w" });
        return accessToken;
    }
    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign({ email: user.email, sub: user.id, role: user.role }, { secret: process.env.JWT_REFRESH_KEY, expiresIn: "1h" });
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    }
    async OAuthLogin({ req, res }) {
        let user = await this.userService.findUserByEmail({ email: req.user.email });
        if (!user)
            user = await this.userService.create(Object.assign({}, req.user));
        this.setRefreshToken({ user, res });
        res.redirect("http://localhost:5501/main-project/frontend/login/index.html");
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map