"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDetailLectureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imageDetailLecture_entity_1 = require("./entities/imageDetailLecture.entity");
const imageDetailLecture_controller_1 = require("./imageDetailLecture.controller");
const imageDetailLecture_service_1 = require("./imageDetailLecture.service");
let ImageDetailLectureModule = class ImageDetailLectureModule {
};
ImageDetailLectureModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([imageDetailLecture_entity_1.ImageDetailLecture])],
        controllers: [imageDetailLecture_controller_1.ImageDetailLectureController],
        providers: [imageDetailLecture_service_1.ImageDetailLectureService],
        exports: [imageDetailLecture_service_1.ImageDetailLectureService],
    })
], ImageDetailLectureModule);
exports.ImageDetailLectureModule = ImageDetailLectureModule;
//# sourceMappingURL=imageDetailLecture.module.js.map