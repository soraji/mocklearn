import { ImageUser } from 'src/apis/imageUser/entities/imageUser.entity';
import { Lecture } from 'src/apis/lectures/entities/lecture.entity';
export declare enum USER_ENUM {
    'T' = "TEACHER",
    'S' = "STUDENT"
}
export declare class User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    paid: number;
    imageUser: ImageUser;
    Lecture: Lecture;
    toJSON(): Record<string, any>;
}
