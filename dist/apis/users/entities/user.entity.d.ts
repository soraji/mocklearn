import { ImageUser } from 'src/apis/imageUser/entities/imageUser.entity';
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
}
