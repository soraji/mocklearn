"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_review_dto_1 = require("./create-review.dto");
class UpdateReviewInput extends (0, swagger_1.PartialType)(create_review_dto_1.CreateReviewInput) {
}
exports.UpdateReviewInput = UpdateReviewInput;
//# sourceMappingURL=update-review.dto.js.map