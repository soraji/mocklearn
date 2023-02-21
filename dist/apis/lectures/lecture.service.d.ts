import { Repository } from 'typeorm';
import { LectureCategory } from '../categories/entities/category.entity';
import { ImageDetailLecture } from '../imageDetailLecture/entities/imageDetailLecture.entity';
import { ImageMainLecture } from '../imageMainLecture/entities/imageMainLecture.entity';
import { LectureDetail } from '../lectureDetails/entities/lectureDetail.entity';
import { Lecture } from './entities/lecture.entity';
export declare class LectureService {
    private readonly lectureRepository;
    private readonly imageMainLecture;
    private readonly lectureCategoriesRepository;
    private readonly lectureDetailRepository;
    private readonly imageDetailRepository;
    constructor(lectureRepository: Repository<Lecture>, imageMainLecture: Repository<ImageMainLecture>, lectureCategoriesRepository: Repository<LectureCategory>, lectureDetailRepository: Repository<LectureDetail>, imageDetailRepository: Repository<ImageDetailLecture>);
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
    update({ req, id, updateLectureInput }: {
        req: any;
        id: any;
        updateLectureInput: any;
    }): Promise<Lecture>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
