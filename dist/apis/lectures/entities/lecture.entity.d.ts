import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { Curriculum } from 'src/apis/curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from 'src/apis/imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from 'src/apis/imageMainLecture/entities/imageMainLecture.entity';
export declare class Lecture {
    id: string;
    title: string;
    teacher: string;
    price: string;
    star: string;
    reviewCount: number;
    lectureCategory: LectureCategory;
    curriculum: Curriculum;
    imageMainLecture: ImageMainLecture;
    imageDetailLecture: ImageDetailLecture[];
}