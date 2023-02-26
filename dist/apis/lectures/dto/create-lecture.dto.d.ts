import { LEVEL_ENUM } from 'src/apis/lectureDetails/entities/lectureDetail.entity';
export declare class CreateLectureInput {
    title: string;
    price: number;
    imageMainUrl: string;
    lectureCategoryId: string;
    description: string;
    level: LEVEL_ENUM;
    imageDetailLecture: string[];
    section: string[];
    content: string[];
    lectureTags: string[];
}
