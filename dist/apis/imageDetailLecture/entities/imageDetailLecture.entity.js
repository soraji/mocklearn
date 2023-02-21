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
exports.ImageDetailLecture = void 0;
const lecture_entity_1 = require("../../lectures/entities/lecture.entity");
const typeorm_1 = require("typeorm");
let ImageDetailLecture = class ImageDetailLecture {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ImageDetailLecture.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], ImageDetailLecture.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lecture_entity_1.Lecture),
    __metadata("design:type", lecture_entity_1.Lecture)
], ImageDetailLecture.prototype, "lecture", void 0);
ImageDetailLecture = __decorate([
    (0, typeorm_1.Entity)()
], ImageDetailLecture);
exports.ImageDetailLecture = ImageDetailLecture;
//# sourceMappingURL=imageDetailLecture.entity.js.map