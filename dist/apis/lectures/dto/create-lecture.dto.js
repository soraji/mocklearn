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
    (0, swagger_1.ApiProperty)({
        description: '강의 제목',
        example: '강의 제목을 작성해주세요'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '가격', example: 55000 }),
    __metadata("design:type", Number)
], CreateLectureInput.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '대표 이미지 url',
        example: 'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/main/1677134022685-jenkins.png'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "imageMainUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '카테고리 아이디',
        example: '1c3bb49c-d692-4bbb-b953-fe51470e9c43'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "lectureCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: '강의 상세페이지 설명',
        example: '강의 상세 내용을 적어주세요'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '난이도',
        example: 'BEGINNER | INTERMEDIATE | ADVANCED 중 하나를 골라주세요'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: '상세페이지 이미지',
        example: [
            'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855368-detail001.jpeg',
            'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/detail/1676988855371-detail002.jpeg'
        ]
    }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "imageDetailLecture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: '커리큘럼 섹션',
        example: [
            '섹션 0. 대제목1',
            '섹션 1. 대제목2',
            '섹션 2. 대제목3',
            '섹션 3. 대제목4'
        ]
    }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: '커리큘럼 섹션 안 세부목록',
        example: [
            '섹션0에 들어가는 소제목1',
            '섹션0에 들어가는 소제목2',
            '섹션0에 들어가는 소제목3',
            '섹션1에 들어가는 소제목1',
            '섹션1에 들어가는 소제목2',
            '섹션1에 들어가는 소제목3',
            '섹션2에 들어가는 소제목1',
            '섹션2에 들어가는 소제목2',
            '섹션3에 들어가는 소제목1',
            '섹션3에 들어가는 소제목2'
        ]
    }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: '강의 태그',
        example: '["#젠킨스","#CI/CD"]'
    }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "lectureTags", void 0);
exports.CreateLectureInput = CreateLectureInput;
//# sourceMappingURL=create-lecture.dto.js.map