import { ReviewService } from './review.service';
import { CreateReviewInput } from './dto/create-review.dto';
import { UpdateReviewInput } from './dto/update-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    fetchAllLecture(req: any): Promise<import("./entities/review.entity").Review>;
    fetchLecture(id: string): Promise<import("./entities/review.entity").Review>;
    createLecture(req: any, createReviewInput: CreateReviewInput): Promise<{
        star: any;
        content: any;
        lecture: {
            id: any;
        };
        user: {
            id: any;
        };
    } & import("./entities/review.entity").Review>;
    updateLecture(updateReviewInput: UpdateReviewInput, id: string, req: any): Promise<any>;
    deleteLecture(id: string): Promise<import("typeorm").DeleteResult>;
}
