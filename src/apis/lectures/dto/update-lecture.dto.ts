import { PartialType } from "@nestjs/swagger";
import { CreateLectureInput } from "./create-lecture.dto";

export class UpdateLectureInput extends PartialType(CreateLectureInput) {}
