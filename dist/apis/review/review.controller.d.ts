import { ReviewService } from "./review.service";
import { CreateReviewInput } from "./dto/create-review.dto";
import { UpdateReviewInput } from "./dto/update-review.dto";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    fetchLecture(id: string): Promise<import("./entities/review.entity").Review>;
    createLecture(body: any, createReviewInput: CreateReviewInput): Promise<any>;
    updateLecture(updateReviewInput: UpdateReviewInput, id: string): Promise<any>;
    deleteLecture(id: string): Promise<import("typeorm").DeleteResult>;
}
