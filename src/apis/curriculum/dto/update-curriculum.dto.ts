import { PartialType } from "@nestjs/swagger";
import { CreateCurriculumInput } from "./create-curriculum.dto";

export class UpdateCurriculumInput extends PartialType(CreateCurriculumInput) {}
