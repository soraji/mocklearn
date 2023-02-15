import { LEVEL_ENUM } from "../entities/lectureDetail.entity";

export class CreateLectureDetailInput {
  many: string;

  expire: string;

  description: string;

  level: LEVEL_ENUM;
}
