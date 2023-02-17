import { Repository } from "typeorm";
import { LectureCategory } from "./entities/category.entity";
export declare class CategoryService {
    private readonly lectureCategoriesRepository;
    constructor(lectureCategoriesRepository: Repository<LectureCategory>);
    fetchAll(): Promise<LectureCategory[]>;
    create({ name }: {
        name: any;
    }): Promise<{
        name: any;
    } & LectureCategory>;
    update({ id, name }: {
        id: any;
        name: any;
    }): Promise<{
        id: any;
        name: any;
    } & LectureCategory>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
