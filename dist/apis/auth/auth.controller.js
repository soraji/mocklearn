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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../users/user.service");
const auth_service_1 = require("./auth.service");
const bcrypt = require("bcrypt");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(body, req, res) {
        const email = body.email;
        const password = body.password;
        const user = await this.userService.findUserByEmail({ email });
        if (!user)
            throw new common_1.UnprocessableEntityException('이메일이 없습니다.');
        const isAuth = await bcrypt.compare(password, user.password);
        if (!isAuth)
            throw new common_1.UnprocessableEntityException('암호가 틀렸습니다.');
        this.authService.setRefreshToken({ user, res, req });
        return this.authService.getAccessToken({ user });
    }
    restoreAccessToken(req) {
        return this.authService.getAccessToken({ user: req.user });
    }
    async loginGoogle(req, res) {
        this.authService.OAuthLogin({ req, res });
    }
    async loginKakao(req, res) {
        this.authService.OAuthLogin({ req, res });
    }
    async loginNaver(req, res) {
        this.authService.OAuthLogin({ req, res });
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                email: { type: 'string', example: 'test@gmail.com' },
                password: { type: 'string', example: '1234' }
            }
        }
    }),
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('access')),
    (0, swagger_1.ApiOperation)({ summary: 'accessToken 복구' }),
    (0, common_1.Post)('/restoreToken'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AuthController.prototype, "restoreAccessToken", null);
__decorate([
    (0, common_1.Get)('/login/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, swagger_1.ApiOperation)({ summary: '구글 소셜 로그인' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.Get)('/login/kakao'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    (0, swagger_1.ApiOperation)({ summary: '카카오 소셜 로그인' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginKakao", null);
__decorate([
    (0, common_1.Get)('/login/naver'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('naver')),
    (0, swagger_1.ApiOperation)({ summary: '네이버 소셜 로그인' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginNaver", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('로그인 API'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map