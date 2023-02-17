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
exports.LectureDetailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lectureDetail_service_1 = require("./lectureDetail.service");
const create_detail_dto_1 = require("./dto/create-detail.dto");
const update_detail_dto_1 = require("./dto/update-detail.dto");
const passport_1 = require("@nestjs/passport");
let LectureDetailController = class LectureDetailController {
    constructor(lectureDetailService) {
        this.lectureDetailService = lectureDetailService;
    }
    async fetchAllLecture() {
        return await this.lectureDetailService.fetchAll();
    }
    async fetchLecture(id) {
        return await this.lectureDetailService.fetch({ id });
    }
    async createLecture(createLectureDetailInput) {
        return await this.lectureDetailService.create({ createLectureDetailInput });
    }
    async updateLecture(updateLectureDetailInput, id) {
        return await this.lectureDetailService.update({ id, updateLectureDetailInput });
    }
    async deleteLecture(id) {
        return await this.lectureDetailService.delete({ id });
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: '강의 전체 조회', description: '강의 전체 조회 API' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LectureDetailController.prototype, "fetchAllLecture", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: '강의 단일 조회', description: '강의 단일 조회 API' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LectureDetailController.prototype, "fetchLecture", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("teacher")),
    (0, swagger_1.ApiOperation)({ summary: '강의 생성', description: '강의 생성 API' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_detail_dto_1.CreateLectureDetailInput]),
    __metadata("design:returntype", Promise)
], LectureDetailController.prototype, "createLecture", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("teacher")),
    (0, swagger_1.ApiOperation)({ summary: '강의 업데이트', description: '강의 업데이트 API' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_detail_dto_1.UpdateLectureDetailInput, String]),
    __metadata("design:returntype", Promise)
], LectureDetailController.prototype, "updateLecture", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("teacher")),
    (0, swagger_1.ApiOperation)({ summary: '강의 삭제', description: '강의 삭제 API' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LectureDetailController.prototype, "deleteLecture", null);
LectureDetailController = __decorate([
    (0, common_1.Controller)('lectureDetail'),
    (0, swagger_1.ApiTags)('강의 상세페이지 API'),
    __metadata("design:paramtypes", [lectureDetail_service_1.LectureDetailService])
], LectureDetailController);
exports.LectureDetailController = LectureDetailController;
//# sourceMappingURL=lectureDetail.controller.js.map