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
exports.CreateUserInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../entities/user.entity");
class CreateUserInput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이름' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '핸드폰번호' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '비밀번호' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '권한', example: 'TEACHER || STUDENT' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '사용자 이미지 url',
        example: 'https://sorasample-bucket.s3.ap-northeast-2.amazonaws.com/image/user/1676353859021-pika.jpeg'
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "imageUser", void 0);
exports.CreateUserInput = CreateUserInput;
//# sourceMappingURL=create-user.dto.js.map