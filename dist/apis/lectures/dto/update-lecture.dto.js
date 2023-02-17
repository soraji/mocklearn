"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLectureInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_lecture_dto_1 = require("./create-lecture.dto");
class UpdateLectureInput extends (0, swagger_1.PartialType)(create_lecture_dto_1.CreateLectureInput) {
}
exports.UpdateLectureInput = UpdateLectureInput;
//# sourceMappingURL=update-lecture.dto.js.map