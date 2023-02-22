import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    getAccessToken({ user }: {
        user: any;
    }): string;
    setRefreshToken({ user, res, req }: IAuthServiceSetRefreshToken): string;
    OAuthLogin({ req, res }: {
        req: any;
        res: any;
    }): Promise<void>;
}
