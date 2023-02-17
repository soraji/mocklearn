"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCurriculumInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_curriculum_dto_1 = require("./create-curriculum.dto");
class UpdateCurriculumInput extends (0, swagger_1.PartialType)(create_curriculum_dto_1.CreateCurriculumInput) {
}
exports.UpdateCurriculumInput = UpdateCurriculumInput;
//# sourceMappingURL=update-curriculum.dto.js.map