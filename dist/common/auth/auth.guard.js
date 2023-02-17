"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRefreshGuard = exports.RolesAccessGuard = void 0;
const passport_1 = require("@nestjs/passport");
class RolesAccessGuard extends (0, passport_1.AuthGuard)('access') {
    getRequest(context) {
    }
}
exports.RolesAccessGuard = RolesAccessGuard;
class RolesRefreshGuard extends (0, passport_1.AuthGuard)('refresh') {
    getRequest(context) {
    }
}
exports.RolesRefreshGuard = RolesRefreshGuard;
//# sourceMappingURL=auth.guard.js.map