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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDetailLectureController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const imageDetailLecture_service_1 = require("./imageDetailLecture.service");
let ImageDetailLectureController = class ImageDetailLectureController {
    constructor(imageDetailLectureService) {
        this.imageDetailLectureService = imageDetailLectureService;
    }
    async create(request, response) {
        try {
            await this.imageDetailLectureService.fileupload(request, response);
        }
        catch (error) {
            return response
                .status(500)
                .json(`Failed to upload image file: ${error.message}`);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: '강의 상세페이지 이미지 업로드',
        description: '강의 상세페이지 이미지 업로드 API'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '이미지 등록이 완료되면 이미지 url을 보여줍니다'
    }),
    (0, swagger_1.ApiBody)({
        required: true,
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                upload: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImageDetailLectureController.prototype, "create", null);
ImageDetailLectureController = __decorate([
    (0, common_1.Controller)('imageDetailLecture'),
    (0, swagger_1.ApiTags)('강의 상세페이지 이미지 업로드 API'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('teacher')),
    __metadata("design:paramtypes", [imageDetailLecture_service_1.ImageDetailLectureService])
], ImageDetailLectureController);
exports.ImageDetailLectureController = ImageDetailLectureController;
//# sourceMappingURL=imageDetailLecture.controller.js.map