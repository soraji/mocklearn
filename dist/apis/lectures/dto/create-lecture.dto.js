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
        example: 'Jenkins를 이용한 CI/CD Pipeline 구축'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지식공유자', example: '지식공유자' }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "teacher", void 0);
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
        description: '강의 상세페이지 설명',
        example: '초급자를 위해 준비한 [데브옵스 · 인프라, 백엔드] 강의입니다. 본 강의는 클라우드 네이티브 애플리케이션을 구성하는 4가지 핵심 요소(MSA, CI/CD, DevOps, Container) 중 하나인 CI(Continuous Integration, 지속적인 통합)과 CD(Continuous Deployment, 지속적인 배포) 파이프라인에 대한 다루는 강의입니다. 본 강의를 통해 CI/CD 도구인 Jenkins를 이용하여 로컬 환경과 클라우드 환경에 자신만의 자동화 파이프라인을 구축하고, 배포하는 데에 필요한 과정을 이해하고 실습해 볼 수 있습니다.'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '난이도',
        example: 'BEGINNER | INTERMEDIATE | ADVANCED'
    }),
    __metadata("design:type", String)
], CreateLectureInput.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
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
        description: '커리큘럼 섹션',
        example: '섹션 0. 과정 및 강의 내용 소개,섹션 1. DevOps와 CI/CD의 이해,섹션 2. Jenkins를 이용한 CI/CD 자동화 도구의 사용,섹션 3. Jenkins + Infrastructure as Code 와의 연동'
    }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "section", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '커리큘럼 섹션 안 세부목록',
        example: '과정소개,Waterfall vs Agile,Cloud Native Application의 구성요소,CI/CD 자동화 도구의 이해,CI/CD Work flow,Infrastructure as Code 개요와 Ansible의 이해,Docker 컨테이너로 Ansible 실행하기'
    }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '강의 태그', example: '["#젠킨스","#CI/CD"]' }),
    __metadata("design:type", Array)
], CreateLectureInput.prototype, "lectureTags", void 0);
exports.CreateLectureInput = CreateLectureInput;
//# sourceMappingURL=create-lecture.dto.js.map