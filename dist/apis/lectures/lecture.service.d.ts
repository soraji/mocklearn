import { Repository } from "typeorm";
import { LectureCategory } from "../categories/entities/category.entity";
import { Lecture } from "./entities/lecture.entity";
export declare class LectureService {
    private readonly lectureRepository;
    private readonly lectureCategoriesRepository;
    constructor(lectureRepository: Repository<Lecture>, lectureCategoriesRepository: Repository<LectureCategory>);
    fetchAll(): Promise<Lecture[]>;
    fetch({ id }: {
        id: any;
    }): Promise<Lecture>;
    create({ createLectureInput }: {
        createLectureInput: any;
    }): Promise<any>;
    update({ id, updateLectureInput }: {
        id: any;
        updateLectureInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
