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
exports.LectureController = void 0;
const common_1 = require("@nestjs/common");
const create_lecture_dto_1 = require("./dto/create-lecture.dto");
const update_lecture_dto_1 = require("./dto/update-lecture.dto");
const lecture_service_1 = require("./lecture.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let LectureController = class LectureController {
    constructor(lectureService) {
        this.lectureService = lectureService;
    }
    async fetchAllLecture(page) {
        return await this.lectureService.fetchAll({ page });
    }
    async fetchLecture(id) {
        return await this.lectureService.fetch({ id });
    }
    async createLecture(req, createLectureInput) {
        return await this.lectureService.create({ req, createLectureInput });
    }
    async updateLecture(updateLectureInput, id, req) {
        const lecture = await this.lectureService.fetch({ id });
        return await this.lectureService.update({
            req,
            lecture,
            updateLectureInput
        });
    }
    async deleteLecture(id) {
        const lecture = await this.lectureService.fetch({ id });
        return await this.lectureService.delete({ lecture });
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({
        summary: '강의 전체 조회',
        description: '강의 전체 조회 API'
    }),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LectureController.prototype, "fetchAllLecture", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '강의 단일 조회',
        description: '강의 단일 조회 API'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LectureController.prototype, "fetchLecture", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    (0, swagger_1.ApiOperation)({ summary: '강의 생성', description: '강의 생성 API' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_lecture_dto_1.CreateLectureInput]),
    __metadata("design:returntype", Promise)
], LectureController.prototype, "createLecture", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    (0, swagger_1.ApiOperation)({ summary: '강의 업데이트', description: '강의 업데이트 API' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_lecture_dto_1.UpdateLectureInput, String, Object]),
    __metadata("design:returntype", Promise)
], LectureController.prototype, "updateLecture", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    (0, swagger_1.ApiOperation)({ summary: '강의 삭제', description: '강의 삭제 API' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LectureController.prototype, "deleteLecture", null);
LectureController = __decorate([
    (0, common_1.Controller)('lecture'),
    (0, swagger_1.ApiTags)('강의 API'),
    __metadata("design:paramtypes", [lecture_service_1.LectureService])
], LectureController);
exports.LectureController = LectureController;
//# sourceMappingURL=lecture.controller.js.map