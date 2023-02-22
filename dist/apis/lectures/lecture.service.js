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
const curriculum_entity_1 = require("../curriculum/entities/curriculum.entity");
const imageDetailLecture_entity_1 = require("../imageDetailLecture/entities/imageDetailLecture.entity");
const imageMainLecture_entity_1 = require("../imageMainLecture/entities/imageMainLecture.entity");
const lectureDetail_entity_1 = require("../lectureDetails/entities/lectureDetail.entity");
const lectureTag_entity_1 = require("../lectureTags/entities/lectureTag.entity");
const review_entity_1 = require("../review/entities/review.entity");
const lecture_entity_1 = require("./entities/lecture.entity");
let LectureService = class LectureService {
    constructor(lectureRepository, imageMainLecture, reviewRepository, curriculumRepository, lectureTagRepository, lectureDetailRepository, imageDetailRepository) {
        this.lectureRepository = lectureRepository;
        this.imageMainLecture = imageMainLecture;
        this.reviewRepository = reviewRepository;
        this.curriculumRepository = curriculumRepository;
        this.lectureTagRepository = lectureTagRepository;
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
            relations: ['lectureCategory', 'imageMainLecture', 'lectureTags']
        });
        return result;
    }
    async fetch({ id }) {
        const result = await this.lectureRepository.findOne({
            where: { id: id },
            relations: [
                'lectureCategory',
                'lectureDetail',
                'imageMainLecture',
                'imageDetailLecture',
                'curriculum',
                'lectureTags'
            ]
        });
        return result;
    }
    async create({ req, createLectureInput }) {
        const { imageMainUrl, lectureCategoryId, lectureTags, many, expire, description, level, imageDetailLecture, section, content } = createLectureInput, lecture = __rest(createLectureInput, ["imageMainUrl", "lectureCategoryId", "lectureTags", "many", "expire", "description", "level", "imageDetailLecture", "section", "content"]);
        if (req.user.role !== 'TEACHER')
            throw new common_1.UnprocessableEntityException('강의 등록 권한이 없습니다');
        if (!lectureCategoryId)
            throw new common_1.UnprocessableEntityException('카테고리를 입력하셔야 합니다');
        if (!imageMainUrl)
            throw new common_1.UnprocessableEntityException('대표 이미지는 반드시 등록해야 합니다');
        const img = await this.imageMainLecture.save({
            url: imageMainUrl
        });
        const temp = [];
        for (let i = 0; i < lectureTags.length; i++) {
            const tagname = lectureTags[i].replace('#', '');
            const prevTag = await this.lectureTagRepository.findOne({
                where: { tag: tagname }
            });
            if (prevTag) {
                temp.push(prevTag);
            }
            else {
                const newTag = await this.lectureTagRepository.save({
                    tag: tagname
                });
                temp.push(newTag);
            }
        }
        const detail = await this.lectureDetailRepository.save({
            many,
            expire,
            description,
            level
        });
        const curr = await this.curriculumRepository.save({
            section,
            content
        });
        const result = await this.lectureRepository.save(Object.assign(Object.assign({}, lecture), { lectureTags: temp, imageMainLecture: img, lectureCategory: { id: lectureCategoryId }, lectureDetail: { id: detail.id }, curriculum: { id: curr.id } }));
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
    async update({ req, lecture, updateLectureInput }) {
        const { imageMainUrl, lectureCategoryId, many, expire, description, level, imageDetailLecture } = updateLectureInput, rest = __rest(updateLectureInput, ["imageMainUrl", "lectureCategoryId", "many", "expire", "description", "level", "imageDetailLecture"]);
        if (req.user.role !== 'TEACHER')
            throw new common_1.UnprocessableEntityException('강의 등록 권한이 없습니다');
        let result;
        if (imageMainUrl) {
            const img = await this.imageMainLecture.save({
                url: imageMainUrl
            });
            result = await this.lectureRepository.save(Object.assign(Object.assign({ id: lecture.id }, rest), { imageMainLecture: img, lectureCategory: { id: lectureCategoryId } }));
        }
        else {
            result = await this.lectureRepository.save(Object.assign(Object.assign({ id: lecture.id }, rest), { lectureCategory: { id: lectureCategoryId } }));
        }
        await this.imageMainLecture.delete({
            id: lecture.imageMainLecture.id
        });
        const lectureDetail = await this.lectureDetailRepository.findOne({
            where: { lecture: { id: lecture.id } }
        });
        await this.lectureDetailRepository.save({
            id: lectureDetail.id,
            many,
            expire,
            description,
            level,
            lecture: { id: result.id }
        });
        if (imageDetailLecture) {
            await this.imageDetailRepository
                .createQueryBuilder()
                .delete()
                .where('lectureId IN (:lectureId)', { lectureId: lecture.id })
                .execute();
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
    async delete({ lecture }) {
        await this.imageDetailRepository
            .createQueryBuilder()
            .delete()
            .where('lectureId IN (:lectureId)', { lectureId: lecture.id })
            .execute();
        await this.reviewRepository
            .createQueryBuilder()
            .delete()
            .where('lectureId IN (:lectureId)', { lectureId: lecture.id })
            .execute();
        await this.lectureRepository.delete({
            id: lecture.id
        });
        await this.curriculumRepository.delete({
            id: lecture.curriculum.id
        });
        await this.imageMainLecture.delete({
            id: lecture.imageMainLecture.id
        });
        await this.lectureDetailRepository.delete({
            id: lecture.lectureDetail.id
        });
    }
};
LectureService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(lecture_entity_1.Lecture)),
    __param(1, (0, typeorm_1.InjectRepository)(imageMainLecture_entity_1.ImageMainLecture)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(3, (0, typeorm_1.InjectRepository)(curriculum_entity_1.Curriculum)),
    __param(4, (0, typeorm_1.InjectRepository)(lectureTag_entity_1.LectureTag)),
    __param(5, (0, typeorm_1.InjectRepository)(lectureDetail_entity_1.LectureDetail)),
    __param(6, (0, typeorm_1.InjectRepository)(imageDetailLecture_entity_1.ImageDetailLecture)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LectureService);
exports.LectureService = LectureService;
//# sourceMappingURL=lecture.service.js.map