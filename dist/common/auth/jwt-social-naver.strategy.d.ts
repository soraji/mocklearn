import { Strategy } from "passport-naver";
declare const JwtNaverStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtNaverStrategy extends JwtNaverStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): {
        name: any;
        email: any;
        password: any;
    };
}
export {};
