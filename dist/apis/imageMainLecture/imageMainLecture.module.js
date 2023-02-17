"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMainLectureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imageMainLecture_entity_1 = require("./entities/imageMainLecture.entity");
const imageMainLecture_controller_1 = require("./imageMainLecture.controller");
const imageMainLecture_service_1 = require("./imageMainLecture.service");
let ImageMainLectureModule = class ImageMainLectureModule {
};
ImageMainLectureModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([imageMainLecture_entity_1.ImageMainLecture])],
        controllers: [imageMainLecture_controller_1.ImageMainLectureController],
        providers: [imageMainLecture_service_1.ImageMainLectureService],
        exports: [imageMainLecture_service_1.ImageMainLectureService],
    })
], ImageMainLectureModule);
exports.ImageMainLectureModule = ImageMainLectureModule;
//# sourceMappingURL=imageMainLecture.module.js.map