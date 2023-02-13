import { PartialType } from "@nestjs/swagger";
import { CreateReviewInput } from "./create-review.dto";

export class UpdateReviewInput extends PartialType(CreateReviewInput) {}
