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
const user_entity_1 = require("../users/entities/user.entity");
const review_entity_1 = require("./entities/review.entity");
let ReviewService = class ReviewService {
    constructor(reviewRepository, lectureRepository, userRepository) {
        this.reviewRepository = reviewRepository;
        this.lectureRepository = lectureRepository;
        this.userRepository = userRepository;
    }
    async fetchAll({ req }) {
        const result = await this.reviewRepository.findOne({
            where: { user: { id: req.user.id } },
            relations: ['lecture']
        });
        return result;
    }
    async fetch({ id }) {
        const result = await this.reviewRepository.findOne({
            where: { id: id },
            relations: ['lecture']
        });
        return result;
    }
    async create({ req, createReviewInput }) {
        const { lectureId } = createReviewInput, review = __rest(createReviewInput, ["lectureId"]);
        const lecture = await this.lectureRepository.findOne({
            where: { id: lectureId }
        });
        if (!lecture)
            throw new common_1.UnprocessableEntityException('강의가 존재하지 않습니다');
        const user = await this.userRepository.findOne({
            where: { id: req.user.id }
        });
        if (!user)
            throw new common_1.UnprocessableEntityException('사용자 정보를 확인할 수 없습니다');
        const userDuplicate = await this.reviewRepository.findOne({
            where: { user: { id: req.user.id }, lecture: { id: lectureId } }
        });
        if (userDuplicate) {
            throw new common_1.UnprocessableEntityException(user.name +
                '님은 이미 구매평을 작성하셨습니다. 구매한 강의에는 1개의 수강평만 작성 가능합니다');
        }
        const result = await this.reviewRepository.save(Object.assign(Object.assign({}, review), { lecture: { id: lectureId }, user: { id: req.user.id } }));
        await this.lectureRepository.save({
            id: lectureId,
            reviewCount: lecture.reviewCount + 1
        });
        return result;
    }
    async update({ req, id, updateReviewInput }) {
        const { lectureId } = updateReviewInput, review = __rest(updateReviewInput, ["lectureId"]);
        const userCheck = await this.reviewRepository.findOne({
            user: { id: req.user.id }
        });
        if (!userCheck)
            throw new common_1.UnprocessableEntityException('작성하신 수강평의 정보와 사용자 정보가 일치하지 않습니다');
        const result = await this.reviewRepository.save(Object.assign({ id: id, lecture: { id: lectureId } }, review));
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
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map