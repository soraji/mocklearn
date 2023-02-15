import { PartialType } from "@nestjs/swagger";
import { CreateLectureDetailInput } from "./create-detail.dto";

export class UpdateLectureDetailInput extends PartialType(CreateLectureDetailInput) {}
