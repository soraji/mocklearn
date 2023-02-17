/// <reference types="qs" />
/// <reference types="express" />
import { Repository } from 'typeorm';
import { ImageUser } from './entities/imageUser.entity';
export declare class ImageUserService {
    private readonly imageUserRepository;
    constructor(imageUserRepository: Repository<ImageUser>);
    fileupload(req: any, res: any): Promise<void>;
    upload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}
