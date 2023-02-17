import { Strategy } from 'passport-jwt';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor();
    validate(payload: any): {
        email: any;
        id: any;
        role: any;
    };
}
export {};
