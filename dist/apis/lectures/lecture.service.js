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
const imageDetailLecture_entity_1 = require("../imageDetailLecture/entities/imageDetailLecture.entity");
const imageMainLecture_entity_1 = require("../imageMainLecture/entities/imageMainLecture.entity");
const lectureDetail_entity_1 = require("../lectureDetails/entities/lectureDetail.entity");
const lecture_entity_1 = require("./entities/lecture.entity");
let LectureService = class LectureService {
    constructor(lectureRepository, imageMainLecture, lectureCategoriesRepository, lectureDetailRepository, imageDetailRepository) {
        this.lectureRepository = lectureRepository;
        this.imageMainLecture = imageMainLecture;
        this.lectureCategoriesRepository = lectureCategoriesRepository;
        this.lectureDetailRepository = lectureDetailRepository;
        this.imageDetailRepository = imageDetailRepository;
    }
    async fetchAll({ page }) {
        const result = await this.lectureRepository.find({
            take: 24,
            skip: (page - 1) * 24,
            order: {
                price: 'ASC'
            },
            relations: ['lectureCategory', 'imageMainLecture']
        });
        return result;
    }
    async fetch({ id }) {
        const result = await this.lectureRepository.findOne({
            where: { id: id },
            relations: [
                'lectureCategory',
                'imageMainLecture',
                'imageDetailLecture',
                'curriculum'
            ]
        });
        return result;
    }
    async create({ req, createLectureInput }) {
        const { imageMainUrl, lectureCategoryId, many, expire, description, level, imageDetailLecture } = createLectureInput, lecture = __rest(createLectureInput, ["imageMainUrl", "lectureCategoryId", "many", "expire", "description", "level", "imageDetailLecture"]);
        if (req.user.role !== 'TEACHER')
            throw new common_1.UnprocessableEntityException('강의 등록 권한이 없습니다');
        if (!lectureCategoryId)
            throw new common_1.UnprocessableEntityException('카테고리를 입력하셔야 합니다');
        if (!imageMainUrl)
            throw new common_1.UnprocessableEntityException('대표 이미지는 반드시 등록해야 합니다');
        const img = await this.imageMainLecture.save({
            url: imageMainUrl
        });
        const result = await this.lectureRepository.save(Object.assign(Object.assign({}, lecture), { imageMainLecture: img, lectureCategory: { id: lectureCategoryId } }));
        await this.lectureDetailRepository.save({
            many,
            expire,
            description,
            level,
            lecture: { id: result.id }
        });
        if (imageDetailLecture) {
            await Promise.all(imageDetailLecture.map((el, i) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const newImage = await this.imageDetailRepository.save({
                            url: el,
                            lecture: { id: result.id }
                        });
                        resolve(newImage);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }));
        }
        return result;
    }
    async update({ req, id, updateLectureInput }) {
        const { imageMainUrl, lectureCategoryId, many, expire, description, level, imageDetailLecture } = updateLectureInput, lecture = __rest(updateLectureInput, ["imageMainUrl", "lectureCategoryId", "many", "expire", "description", "level", "imageDetailLecture"]);
        if (req.user.role !== 'TEACHER')
            throw new common_1.UnprocessableEntityException('강의 등록 권한이 없습니다');
        let result;
        if (imageMainUrl) {
            const img = await this.imageMainLecture.save({
                url: imageMainUrl
            });
            result = await this.lectureRepository.save(Object.assign(Object.assign({ id: id }, lecture), { imageMainLecture: img, lectureCategory: { id: lectureCategoryId } }));
        }
        else {
            result = await this.lectureRepository.save(Object.assign(Object.assign({ id: id }, lecture), { lectureCategory: { id: lectureCategoryId } }));
        }
        await this.lectureDetailRepository.save({
            many,
            expire,
            description,
            level,
            lecture: { id: result.id }
        });
        if (imageDetailLecture) {
            await Promise.all(imageDetailLecture.map((el, i) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        const newImage = await this.imageDetailRepository.save({
                            url: el,
                            lecture: { id: result.id }
                        });
                        resolve(newImage);
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }));
        }
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
    __param(1, (0, typeorm_1.InjectRepository)(imageMainLecture_entity_1.ImageMainLecture)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.LectureCategory)),
    __param(3, (0, typeorm_1.InjectRepository)(lectureDetail_entity_1.LectureDetail)),
    __param(4, (0, typeorm_1.InjectRepository)(imageDetailLecture_entity_1.ImageDetailLecture)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LectureService);
exports.LectureService = LectureService;
//# sourceMappingURL=lecture.service.js.map