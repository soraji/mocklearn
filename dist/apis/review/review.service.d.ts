import { Repository } from "typeorm";
import { Lecture } from "../lectures/entities/lecture.entity";
import { Review } from "./entities/review.entity";
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly lectureRepository;
    constructor(reviewRepository: Repository<Review>, lectureRepository: Repository<Lecture>);
    fetch({ id }: {
        id: any;
    }): Promise<Review>;
    create({ createReviewInput }: {
        createReviewInput: any;
    }): Promise<any>;
    update({ id, updateReviewInput }: {
        id: any;
        updateReviewInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
