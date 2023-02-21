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
exports.LectureDetail = exports.LEVEL_ENUM = void 0;
const lecture_entity_1 = require("../../lectures/entities/lecture.entity");
const typeorm_1 = require("typeorm");
var LEVEL_ENUM;
(function (LEVEL_ENUM) {
    LEVEL_ENUM["BEGINNER"] = "BEGINNER";
    LEVEL_ENUM["INTERMEDIATE"] = "INTERMEDIATE";
    LEVEL_ENUM["ADVANCED"] = "ADVANCED";
})(LEVEL_ENUM = exports.LEVEL_ENUM || (exports.LEVEL_ENUM = {}));
let LectureDetail = class LectureDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LectureDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], LectureDetail.prototype, "many", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], LectureDetail.prototype, "expire", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: LEVEL_ENUM }),
    __metadata("design:type", String)
], LectureDetail.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext'),
    __metadata("design:type", String)
], LectureDetail.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => lecture_entity_1.Lecture),
    __metadata("design:type", lecture_entity_1.Lecture)
], LectureDetail.prototype, "lecture", void 0);
LectureDetail = __decorate([
    (0, typeorm_1.Entity)()
], LectureDetail);
exports.LectureDetail = LectureDetail;
//# sourceMappingURL=lectureDetail.entity.js.map