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
exports.CreateReviewInput = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateReviewInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '강의ID',
        example: '369b7493-1f6f-41c6-9a0a-49d2a16cdd7b'
    }),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "lectureId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '평점', example: '4.6' }),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "star", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수강평 내용',
        example: '너무 도움되는 강의였어요! 감사합니다!! '
    }),
    __metadata("design:type", String)
], CreateReviewInput.prototype, "content", void 0);
exports.CreateReviewInput = CreateReviewInput;
//# sourceMappingURL=create-review.dto.js.map