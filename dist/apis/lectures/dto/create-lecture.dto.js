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
exports.CreateLectureInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const lectureDetail_entity_1 = require("../../lectureDetails/entities/lectureDetail.entity");
class CreateLectureInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '강의 제목' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지식공유자' }),
    __metadata("design:type", Number)
], CreateLectureInput.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '가격' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '강의 평점' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "star", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '대표 이미지 url' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "imageMainUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '카테고리 아이디' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "lectureCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '강의 갯수' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "many", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '수강 기간' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "expire", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '강의 상세페이지 설명' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '난이도' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '상세페이지 이미지' }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "imageDetailLecture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '커리큘럼 섹션' }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '커리큘럼 섹션 안 세부목록' }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '강의 태그' }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "lectureTags", void 0);
exports.CreateLectureInput = CreateLectureInput;
//# sourceMappingURL=create-lecture.dto.js.map