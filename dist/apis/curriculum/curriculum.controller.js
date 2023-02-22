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
exports.CurriculumController = void 0;
const common_1 = require("@nestjs/common");
const create_curriculum_dto_1 = require("./dto/create-curriculum.dto");
const update_curriculum_dto_1 = require("./dto/update-curriculum.dto");
const curriculum_service_1 = require("./curriculum.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let CurriculumController = class CurriculumController {
    constructor(curriculumService) {
        this.curriculumService = curriculumService;
    }
    async fetchAllLecture() {
        return await this.curriculumService.fetchAll();
    }
    async fetchLecture(id) {
        return await this.curriculumService.fetch({ id });
    }
    async createLecture(createCurriculumInput) {
        return await this.curriculumService.create({ createCurriculumInput });
    }
    async updateLecture(updateCurriculumInput, id) {
        const curr = await this.curriculumService.fetch({ id });
        return await this.curriculumService.update({ curr, updateCurriculumInput });
    }
    async deleteLecture(id) {
        const curr = await this.curriculumService.fetch({ id });
        return await this.curriculumService.delete({ curr });
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: '커리큘럼 전체 조회',
        description: '커리큘럼 전체 조회 API'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CurriculumController.prototype, "fetchAllLecture", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '커리큘럼 단일 조회',
        description: '커리큘럼 단일 조회 API'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurriculumController.prototype, "fetchLecture", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    (0, swagger_1.ApiOperation)({ summary: '커리큘럼 생성', description: '커리큘럼 생성 API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_curriculum_dto_1.CreateCurriculumInput]),
    __metadata("design:returntype", Promise)
], CurriculumController.prototype, "createLecture", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    (0, swagger_1.ApiOperation)({
        summary: '커리큘럼 업데이트',
        description: '커리큘럼 업데이트 API'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_curriculum_dto_1.UpdateCurriculumInput, String]),
    __metadata("design:returntype", Promise)
], CurriculumController.prototype, "updateLecture", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    (0, swagger_1.ApiOperation)({ summary: '커리큘럼 삭제', description: '커리큘럼 삭제 API' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurriculumController.prototype, "deleteLecture", null);
CurriculumController = __decorate([
    (0, common_1.Controller)('curriculum'),
    (0, swagger_1.ApiTags)('커리큘럼 API'),
    __metadata("design:paramtypes", [curriculum_service_1.CurriculumService])
], CurriculumController);
exports.CurriculumController = CurriculumController;
//# sourceMappingURL=curriculum.controller.js.map