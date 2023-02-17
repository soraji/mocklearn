import { LectureDetailService } from "./lectureDetail.service";
import { CreateLectureDetailInput } from './dto/create-detail.dto';
import { UpdateLectureDetailInput } from './dto/update-detail.dto';
export declare class LectureDetailController {
    private readonly lectureDetailService;
    constructor(lectureDetailService: LectureDetailService);
    fetchAllLecture(): Promise<import("./entities/lectureDetail.entity").LectureDetail[]>;
    fetchLecture(id: string): Promise<import("./entities/lectureDetail.entity").LectureDetail>;
    createLecture(createLectureDetailInput: CreateLectureDetailInput): Promise<void>;
    updateLecture(updateLectureDetailInput: UpdateLectureDetailInput, id: string): Promise<void>;
    deleteLecture(id: string): Promise<import("typeorm").DeleteResult>;
}
