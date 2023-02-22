import { CreateLectureInput } from './dto/create-lecture.dto';
import { UpdateLectureInput } from './dto/update-lecture.dto';
import { Lecture } from './entities/lecture.entity';
import { LectureService } from './lecture.service';
export declare class LectureController {
    private readonly lectureService;
    constructor(lectureService: LectureService);
    fetchAllLecture(page: number): Promise<Lecture[]>;
    fetchLecture(id: string): Promise<Lecture>;
    createLecture(req: any, createLectureInput: CreateLectureInput): Promise<any>;
    updateLecture(updateLectureInput: UpdateLectureInput, id: string, req: any): Promise<Lecture>;
    deleteLecture(id: string): Promise<void>;
}
