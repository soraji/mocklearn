import { Repository } from 'typeorm';
import { Curriculum } from '../curriculum/entities/curriculum.entity';
import { ImageDetailLecture } from '../imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from '../imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from '../lectureDetails/entities/lectureDetail.entity';
import { LectureTag } from '../lectureTags/entities/lectureTag.entity';
import { Review } from '../review/entities/review.entity';
import { Lecture } from './entities/lecture.entity';
export declare class LectureService {
    private readonly lectureRepository;
    private readonly imageMainLecture;
    private readonly reviewRepository;
    private readonly curriculumRepository;
    private readonly lectureTagRepository;
    private readonly lectureDetailRepository;
    private readonly imageDetailRepository;
    constructor(lectureRepository: Repository<Lecture>, imageMainLecture: Repository<ImageMainLecture>, reviewRepository: Repository<Review>, curriculumRepository: Repository<Curriculum>, lectureTagRepository: Repository<LectureTag>, lectureDetailRepository: Repository<LectureDetail>, imageDetailRepository: Repository<ImageDetailLecture>);
    fetchAll({ page }: {
        page: any;
    }): Promise<Lecture[]>;
    fetch({ id }: {
        id: any;
    }): Promise<Lecture>;
    create({ req, createLectureInput }: {
        req: any;
        createLectureInput: any;
    }): Promise<any>;
    update({ req, lecture, updateLectureInput }: {
        req: any;
        lecture: any;
        updateLectureInput: any;
    }): Promise<Lecture>;
    delete({ lecture }: {
        lecture: any;
    }): Promise<void>;
}
