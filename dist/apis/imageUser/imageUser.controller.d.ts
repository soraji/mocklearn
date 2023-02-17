import { ImageUserService } from './imageUser.service';
export declare class ImageUserController {
    private readonly imageUserService;
    constructor(imageUserService: ImageUserService);
    create(request: any, response: any): Promise<any>;
}
