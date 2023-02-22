"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const curriculum_entity_1 = require("../curriculum/entities/curriculum.entity");
const imageDetailLecture_entity_1 = require("../imageDetailLecture/entities/imageDetailLecture.entity");
const imageMainLecture_entity_1 = require("../imageMainLecture/entities/imageMainLecture.entity");
const lectureDetail_entity_1 = require("../lectureDetails/entities/lectureDetail.entity");
const review_entity_1 = require("../review/entities/review.entity");
const lecture_entity_1 = require("./entities/lecture.entity");
const lecture_controller_1 = require("./lecture.controller");
const lecture_service_1 = require("./lecture.service");
let LecturesModule = class LecturesModule {
};
LecturesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                lecture_entity_1.Lecture,
                category_entity_1.LectureCategory,
                imageMainLecture_entity_1.ImageMainLecture,
                lectureDetail_entity_1.LectureDetail,
                imageDetailLecture_entity_1.ImageDetailLecture,
                review_entity_1.Review,
                curriculum_entity_1.Curriculum
            ])
        ],
        providers: [lecture_service_1.LectureService],
        controllers: [lecture_controller_1.LectureController]
    })
], LecturesModule);
exports.LecturesModule = LecturesModule;
//# sourceMappingURL=lecture.module.js.map