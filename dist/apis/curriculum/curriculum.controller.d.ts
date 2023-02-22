import { CreateCurriculumInput } from './dto/create-curriculum.dto';
import { UpdateCurriculumInput } from './dto/update-curriculum.dto';
import { CurriculumService } from './curriculum.service';
export declare class CurriculumController {
    private readonly curriculumService;
    constructor(curriculumService: CurriculumService);
    fetchAllLecture(): Promise<import("./entities/curriculum.entity").Curriculum[]>;
    fetchLecture(id: string): Promise<import("./entities/curriculum.entity").Curriculum>;
    createLecture(createCurriculumInput: CreateCurriculumInput): Promise<any>;
    updateLecture(updateCurriculumInput: UpdateCurriculumInput, id: string): Promise<void>;
    deleteLecture(id: string): Promise<import("typeorm").DeleteResult>;
}
