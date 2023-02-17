import { CreateLectureInput } from "../lectures/dto/create-lecture.dto";
import { UpdateLectureInput } from "../lectures/dto/update-lecture.dto";
import { LectureService } from "../lectures/lecture.service";
export declare class LectureController {
    private readonly lectureService;
    constructor(lectureService: LectureService);
    fetchAllLecture(): Promise<import("../lectures/entities/lecture.entity").Lecture[]>;
    fetchLecture(id: string): Promise<import("../lectures/entities/lecture.entity").Lecture>;
    createLecture(createLectureInput: CreateLectureInput): Promise<any>;
    updateLecture(updateLectureInput: UpdateLectureInput, id: string): Promise<any>;
    deleteLecture(id: string): Promise<import("typeorm").DeleteResult>;
}
