import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
import { User } from 'src/apis/users/entities/user.entity';
export declare class Review {
    id: string;
    content: string;
    star: number;
    createdAt: Date;
    user: User;
    lecture: Lecture;
}
