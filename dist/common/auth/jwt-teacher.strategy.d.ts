import { Strategy } from 'passport-jwt';
declare const JwtTeacherStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtTeacherStrategy extends JwtTeacherStrategy_base {
    constructor();
    validate(req: any, payload: any): Promise<any>;
}
export {};
