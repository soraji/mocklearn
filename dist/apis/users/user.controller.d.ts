import { CreateUserInput } from "./dto/create-user.dto";
import { UpdateUserInput } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    fetchAllLecture(): Promise<User[]>;
    fetchLecture(id: string): Promise<User>;
    createLecture(createUserInput: CreateUserInput): Promise<any>;
    updateLecture(updateUserInput: UpdateUserInput, id: string): Promise<any>;
    deleteLecture(id: string): Promise<import("typeorm").DeleteResult>;
}
