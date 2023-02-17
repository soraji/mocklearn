/// <reference types="qs" />
/// <reference types="express" />
import { Repository } from 'typeorm';
import { ImageMainLecture } from './entities/imageMainLecture.entity';
export declare class ImageMainLectureService {
    private readonly imageMainRepository;
    constructor(imageMainRepository: Repository<ImageMainLecture>);
    fileupload(req: any, res: any): Promise<void>;
    upload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}
