"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lecture_entity_1 = require("../lectures/entities/lecture.entity");
const review_entity_1 = require("./entities/review.entity");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([review_entity_1.Review, lecture_entity_1.Lecture])],
        providers: [review_service_1.ReviewService],
        controllers: [review_controller_1.ReviewController]
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=review.module.js.map