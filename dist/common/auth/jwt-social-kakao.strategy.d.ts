import { Strategy } from "passport-kakao";
declare const JwtKakaoStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtKakaoStrategy extends JwtKakaoStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): Promise<{
        name: any;
        email: any;
        password: any;
    }>;
}
export {};
