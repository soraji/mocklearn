import { CategoryService } from "./category.service";
import { LectureCategory } from "./entities/category.entity";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategory(): Promise<LectureCategory[]>;
    createCategory(body: any): Promise<LectureCategory>;
    updateCategory(body: any, id: string): Promise<{
        id: any;
        name: any;
    } & LectureCategory>;
    deleteCategory(id: string): Promise<import("typeorm").DeleteResult>;
}
