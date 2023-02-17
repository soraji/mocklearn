/// <reference types="qs" />
/// <reference types="express" />
import { ImageDetailLecture } from './entities/imageDetailLecture.entity';
import { Repository } from 'typeorm';
export declare class ImageDetailLectureService {
    private readonly imageDetailRepository;
    constructor(imageDetailRepository: Repository<ImageDetailLecture>);
    fileupload(req: any, res: any): Promise<void>;
    upload: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
}
