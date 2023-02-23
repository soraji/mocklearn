import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ImageUser } from '../imageUser/entities/imageUser.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly imageUserRepository;
    constructor(userRepository: Repository<User>, imageUserRepository: Repository<ImageUser>);
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
