import { Request, Response } from 'express';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
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
    login(body: any, res: Response): Promise<string>;
    restoreAccessToken(req: Request, res: Response): string;
    loginGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginKakao(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginNaver(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};
