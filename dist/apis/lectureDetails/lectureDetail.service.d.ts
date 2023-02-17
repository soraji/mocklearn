import { Repository } from "typeorm";
import { LectureDetail } from "./entities/lectureDetail.entity";
export declare class LectureDetailService {
    private readonly lectureDetailRepository;
    constructor(lectureDetailRepository: Repository<LectureDetail>);
    fetchAll(): Promise<LectureDetail[]>;
    fetch({ id }: {
        id: any;
    }): Promise<LectureDetail>;
    create({ createLectureDetailInput }: {
        createLectureDetailInput: any;
    }): Promise<void>;
    update({ id, updateLectureDetailInput }: {
        id: any;
        updateLectureDetailInput: any;
    }): Promise<void>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
