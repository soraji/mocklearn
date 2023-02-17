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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lecture_entity_1 = require("../lectures/entities/lecture.entity");
const review_entity_1 = require("./entities/review.entity");
let ReviewService = class ReviewService {
    constructor(reviewRepository, lectureRepository) {
        this.reviewRepository = reviewRepository;
        this.lectureRepository = lectureRepository;
    }
    async fetch({ id }) {
        const result = await this.reviewRepository.findOne({
            where: { id: id },
            relations: ['lectureCategory']
        });
        return result;
    }
    async create({ createReviewInput }) {
        const { id } = createReviewInput;
        const lecture = await this.lectureRepository.findOne({
            where: { id: id },
        });
        if (!lecture)
            throw new common_1.UnprocessableEntityException('구매한 제품 정보를 입력해주세요');
        const result = await this.reviewRepository.save(Object.assign(Object.assign({}, createReviewInput), { lecture: { id: id } }));
        await this.lectureRepository.save({
            id: id,
            commentCount: lecture.reviewCount + 1,
        });
        return result;
    }
    async update({ id, updateReviewInput }) {
        const { lectureCategoryId } = updateReviewInput, lecture = __rest(updateReviewInput, ["lectureCategoryId"]);
        const result = await this.reviewRepository.save(Object.assign({ id: id }, lecture));
        return result;
    }
    async delete({ id }) {
        return await this.reviewRepository.delete({
            id: id
        });
    }
};
ReviewService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(lecture_entity_1.Lecture)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map