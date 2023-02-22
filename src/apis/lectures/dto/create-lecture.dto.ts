import { LEVEL_ENUM } from 'src/apis/lectureDetails/entities/lectureDetail.entity';

export class CreateLectureInput {
  title: string;

  price: number;

  teacher: string;

  star: string;

  imageMainUrl: string;

  lectureCategoryId: string;

  //세부정보 입력
  many: string;

  expire: string;

  description: string;

  level: LEVEL_ENUM;

  imageDetailLecture: string[];

  section: string[];

  content: string[];

  lectureTags: string[];
}
