import { CreateUserInput } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    fetchAllUser(): Promise<User[]>;
    fetchUser(id: string): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<any>;
    updateUser(updateUserInput: UpdateUserInput, id: string): Promise<any>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
}
