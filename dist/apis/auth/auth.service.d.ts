import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/user.service";
import { IAuthServiceGetAccessToken, IAuthServiceSetRefreshToken } from "./interfaces/auth-service.interface";
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    getAccessToken({ user }: IAuthServiceGetAccessToken): string;
    setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void;
    OAuthLogin({ req, res }: {
        req: any;
        res: any;
    }): Promise<void>;
}
