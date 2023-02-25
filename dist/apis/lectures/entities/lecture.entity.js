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
exports.Lecture = void 0;
const category_entity_1 = require("../../categories/entities/category.entity");
const curriculum_entity_1 = require("../../curriculum/entities/curriculum.entity");
const imageDetailLecture_entity_1 = require("../../imageDetailLecture/entities/imageDetailLecture.entity");
const imageMainLecture_entity_1 = require("../../imageMainLecture/entities/imageMainLecture.entity");
const lectureDetail_entity_1 = require("../../lectureDetails/entities/lectureDetail.entity");
const lectureTag_entity_1 = require("../../lectureTags/entities/lectureTag.entity");
const typeorm_1 = require("typeorm");
let Lecture = class Lecture {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Lecture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lecture.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lecture.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lecture.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '0' }),
    __metadata("design:type", String)
], Lecture.prototype, "star", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Lecture.prototype, "reviewCount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.LectureCategory),
    __metadata("design:type", category_entity_1.LectureCategory)
], Lecture.prototype, "lectureCategory", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => curriculum_entity_1.Curriculum),
    __metadata("design:type", curriculum_entity_1.Curriculum)
], Lecture.prototype, "curriculum", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => lectureDetail_entity_1.LectureDetail),
    __metadata("design:type", lectureDetail_entity_1.LectureDetail)
], Lecture.prototype, "lectureDetail", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => imageMainLecture_entity_1.ImageMainLecture),
    __metadata("design:type", imageMainLecture_entity_1.ImageMainLecture)
], Lecture.prototype, "imageMainLecture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imageDetailLecture_entity_1.ImageDetailLecture, imageDetailLecture => imageDetailLecture.lecture),
    __metadata("design:type", Array)
], Lecture.prototype, "imageDetailLecture", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => lectureTag_entity_1.LectureTag, lectureTags => lectureTags.lectures),
    __metadata("design:type", Array)
], Lecture.prototype, "lectureTags", void 0);
Lecture = __decorate([
    (0, typeorm_1.Entity)()
], Lecture);
exports.Lecture = Lecture;
//# sourceMappingURL=lecture.entity.js.map