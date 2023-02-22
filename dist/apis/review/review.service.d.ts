import { Repository } from 'typeorm';
import { Lecture } from '../lectures/entities/lecture.entity';
import { User } from '../users/entities/user.entity';
import { Review } from './entities/review.entity';
export declare class ReviewService {
    private readonly reviewRepository;
    private readonly lectureRepository;
    private readonly userRepository;
    constructor(reviewRepository: Repository<Review>, lectureRepository: Repository<Lecture>, userRepository: Repository<User>);
    fetchAll({ req }: {
        req: any;
    }): Promise<Review>;
    fetch({ id }: {
        id: any;
    }): Promise<Review>;
    create({ req, createReviewInput }: {
        req: any;
        createReviewInput: any;
    }): Promise<any>;
    update({ req, review, updateReviewInput }: {
        req: any;
        review: any;
        updateReviewInput: any;
    }): Promise<any>;
    delete({ review }: {
        review: any;
    }): Promise<import("typeorm").DeleteResult>;
}
