import { LectureCategory } from 'src/apis/categories/entities/category.entity';
import { Curriculum } from 'src/apis/curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from 'src/apis/imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from 'src/apis/imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from 'src/apis/lectureDetails/entities/lectureDetail.entity';
import { LectureTag } from 'src/apis/lectureTags/entities/lectureTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
export declare class Lecture {
    id: string;
    title: string;
    price: string;
    star: string;
    reviewCount: number;
    lectureCategory: LectureCategory;
    user: User;
    curriculum: Curriculum;
    lectureDetail: LectureDetail;
    imageMainLecture: ImageMainLecture;
    imageDetailLecture: ImageDetailLecture[];
    lectureTags: LectureTag[];
}
