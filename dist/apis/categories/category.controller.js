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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const category_entity_1 = require("./entities/category.entity");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async getCategory() {
        return await this.categoryService.fetchAll();
    }
    async createCategory(body) {
        const name = body.name;
        if (name === undefined)
            throw new common_1.UnprocessableEntityException('카테고리 이름을 입력해주세요');
        return await this.categoryService.create({ name });
    }
    async updateCategory(body, id) {
        const name = body.name;
        return await this.categoryService.update({ id, name });
    }
    async deleteCategory(id) {
        return await this.categoryService.delete({ id });
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: '강의 카테고리 전체 조회', description: '강의 카테고리 전체 조회 API' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '강의 카테고리', type: category_entity_1.LectureCategory }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("teacher")),
    (0, swagger_1.ApiOperation)({ summary: '강의 카테고리 생성', description: '강의 카테고리 생성 API' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '강의 카테고리 생성', type: category_entity_1.LectureCategory }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                name: { type: "string" }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("teacher")),
    (0, swagger_1.ApiOperation)({ summary: '강의 카테고리 수정', description: '강의 카테고리 수정 API' }),
    (0, swagger_1.ApiCreatedResponse)({ description: '강의 카테고리 수정', type: category_entity_1.LectureCategory }),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                name: { type: "string" }
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("teacher")),
    (0, swagger_1.ApiOperation)({ summary: '강의 카테고리 삭제', description: '강의 카테고리 삭제 API' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '삭제완료' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
CategoryController = __decorate([
    (0, common_1.Controller)('category'),
    (0, swagger_1.ApiTags)('강의 카테고리 API'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map