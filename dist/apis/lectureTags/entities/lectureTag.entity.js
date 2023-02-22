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
exports.LectureTag = void 0;
const typeorm_1 = require("typeorm");
const lecture_entity_1 = require("../../lectures/entities/lecture.entity");
let LectureTag = class LectureTag {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], LectureTag.prototype, "tag_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LectureTag.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => lecture_entity_1.Lecture, lectures => lectures.lectureTags),
    __metadata("design:type", Array)
], LectureTag.prototype, "lectures", void 0);
LectureTag = __decorate([
    (0, typeorm_1.Entity)()
], LectureTag);
exports.LectureTag = LectureTag;
//# sourceMappingURL=lectureTag.entity.js.map