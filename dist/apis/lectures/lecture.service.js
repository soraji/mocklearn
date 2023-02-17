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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const lecture_entity_1 = require("./entities/lecture.entity");
let LectureService = class LectureService {
    constructor(lectureRepository, lectureCategoriesRepository) {
        this.lectureRepository = lectureRepository;
        this.lectureCategoriesRepository = lectureCategoriesRepository;
    }
    async fetchAll() {
        const result = await this.lectureRepository.find({ relations: ['lectureCategory'] });
        return result;
    }
    async fetch({ id }) {
        const result = await this.lectureRepository.findOne({
            where: { id: id },
            relations: ['lectureCategory']
        });
        return result;
    }
    async create({ createLectureInput }) {
        const { lectureCategoryId } = createLectureInput, lecture = __rest(createLectureInput, ["lectureCategoryId"]);
        if (!lectureCategoryId)
            throw new common_1.UnprocessableEntityException('카테고리를 입력하셔야 합니다');
        const result = await this.lectureRepository.save(Object.assign(Object.assign({}, lecture), { lectureCategory: { id: lectureCategoryId } }));
        return result;
    }
    async update({ id, updateLectureInput }) {
        const { lectureCategoryId } = updateLectureInput, lecture = __rest(updateLectureInput, ["lectureCategoryId"]);
        const categoryResult = await this.lectureCategoriesRepository.findOne({
            where: {
                id: lectureCategoryId,
            },
        });
        const result = await this.lectureRepository.save(Object.assign(Object.assign({ id: id }, lecture), { lectureCategory: Object.assign({}, categoryResult) }));
        return result;
    }
    async delete({ id }) {
        return await this.lectureRepository.delete({
            id: id
        });
    }
};
LectureService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(lecture_entity_1.Lecture)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.LectureCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LectureService);
exports.LectureService = LectureService;
//# sourceMappingURL=lecture.service.js.map