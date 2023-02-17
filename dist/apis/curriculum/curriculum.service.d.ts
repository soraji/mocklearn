import { Repository } from "typeorm";
import { Curriculum } from "./entities/curriculum.entity";
export declare class CurriculumService {
    private readonly curriculumRepository;
    constructor(curriculumRepository: Repository<Curriculum>);
    fetchAll(): Promise<Curriculum[]>;
    fetch({ id }: {
        id: any;
    }): Promise<Curriculum>;
    create({ createCurriculumInput }: {
        createCurriculumInput: any;
    }): Promise<void>;
    update({ id, updateCurriculumInput }: {
        id: any;
        updateCurriculumInput: any;
    }): Promise<void>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
