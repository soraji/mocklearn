import { LEVEL_ENUM } from 'src/apis/lectureDetails/entities/lectureDetail.entity';
export declare class CreateLectureInput {
    title: string;
    price: number;
    teacher: string;
    star: string;
    imageMainUrl: string;
    lectureCategoryId: string;
    many: string;
    expire: string;
    description: string;
    level: LEVEL_ENUM;
    imageDetailLecture: string[];
    section: string[];
    content: string[];
}
