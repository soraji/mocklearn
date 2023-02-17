import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
export declare enum LEVEL_ENUM {
    'BEGINNER' = "BEGINNER",
    'INTERMEDIATE' = "INTERMEDIATE",
    'ADVANCED' = "ADVANCED"
}
export declare class LectureDetail {
    id: string;
    many: number;
    expire: Date;
    level: string;
    description: string;
    lecture: Lecture;
}
