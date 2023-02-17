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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async fetchAllLecture() {
        return await this.userService.fetchAll();
    }
    async fetchLecture(id) {
        return await this.userService.fetch({ id });
    }
    async createLecture(createUserInput) {
        return await this.userService.create({ createUserInput });
    }
    async updateLecture(updateUserInput, id) {
        return await this.userService.update({ id, updateUserInput });
    }
    async deleteLecture(id) {
        return await this.userService.delete({ id });
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: '유저 전체 조회', description: '유저 전체 조회 API' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchAllLecture", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: '유저 단일 조회', description: '유저 단일 조회 API' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchLecture", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: '유저 생성', description: '유저 생성 API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createLecture", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: '유저 업데이트', description: '유저 업데이트 API' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserInput, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateLecture", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: '유저 삭제', description: '유저 삭제 API' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteLecture", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('유저 API'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map