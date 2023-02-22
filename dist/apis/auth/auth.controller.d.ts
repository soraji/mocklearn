import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
interface IOAuthUser {
    user: {
        name: string;
        email: string;
        password: string;
    };
}
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(body: any, req: any, res: any): Promise<string>;
    restoreAccessToken(req: any): string;
    loginGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginKakao(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginNaver(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};
