import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    fetchAll(): Promise<User[]>;
    fetch({ id }: {
        id: any;
    }): Promise<User>;
    findUserByEmail({ email }: {
        email: any;
    }): Promise<User>;
    create({ createUserInput }: {
        createUserInput: any;
    }): Promise<any>;
    update({ id, updateUserInput }: {
        id: any;
        updateUserInput: any;
    }): Promise<any>;
    delete({ id }: {
        id: any;
    }): Promise<import("typeorm").DeleteResult>;
}
