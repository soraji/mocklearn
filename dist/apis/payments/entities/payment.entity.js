"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.POINT_TRANSACTION_STATUS_ENUM = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var POINT_TRANSACTION_STATUS_ENUM;
(function (POINT_TRANSACTION_STATUS_ENUM) {
    POINT_TRANSACTION_STATUS_ENUM["PAYMENT"] = "PAYMENT";
    POINT_TRANSACTION_STATUS_ENUM["CANCEL"] = "CANCEL";
})(POINT_TRANSACTION_STATUS_ENUM = exports.POINT_TRANSACTION_STATUS_ENUM || (exports.POINT_TRANSACTION_STATUS_ENUM = {}));
let Payment = class Payment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Payment.prototype, "payment_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "impUid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "" }),
    __metadata("design:type", String)
], Payment.prototype, "membership", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: POINT_TRANSACTION_STATUS_ENUM }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Payment.prototype, "available_date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Payment.prototype, "user", void 0);
Payment = __decorate([
    (0, typeorm_1.Entity)()
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map