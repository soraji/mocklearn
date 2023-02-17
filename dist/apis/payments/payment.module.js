"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const payment_entity_1 = require("./entities/payment.entity");
const payment_service_1 = require("./payment.service");
const iamport_service_1 = require("../iamport/iamport.service");
const payment_controller_1 = require("./payment.controller");
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                payment_entity_1.Payment,
                user_entity_1.User
            ]),
        ],
        providers: [
            payment_service_1.PaymentService,
            iamport_service_1.IamPortService
        ],
        controllers: [payment_controller_1.PaymentController]
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payment.module.js.map