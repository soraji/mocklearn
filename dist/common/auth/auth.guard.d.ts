import { ExecutionContext } from '@nestjs/common';
declare const RolesAccessGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RolesAccessGuard extends RolesAccessGuard_base {
    getRequest(context: ExecutionContext): void;
}
declare const RolesRefreshGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RolesRefreshGuard extends RolesRefreshGuard_base {
    getRequest(context: ExecutionContext): void;
}
export {};
