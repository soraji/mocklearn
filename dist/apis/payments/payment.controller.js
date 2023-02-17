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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const iamport_service_1 = require("../iamport/iamport.service");
const payment_service_1 = require("./payment.service");
let PaymentController = class PaymentController {
    constructor(paymentService, iamPortService) {
        this.paymentService = paymentService;
        this.iamPortService = iamPortService;
    }
    async createPayment(impUid, amount, request) {
        const token = await this.iamPortService.fetchToken(impUid);
        const paymentData = await this.iamPortService.fetchPaymentData({ impUid, token, amount });
        await this.iamPortService.checkDuplicate({ impUid });
        const user = request.user;
        return this.paymentService.create({ impUid, amount, user, paymentData });
    }
};
__decorate([
    __param(0, (0, common_1.Param)('impUid')),
    __param(1, (0, common_1.Param)('amount')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    (0, swagger_1.ApiTags)('결제 API'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        iamport_service_1.IamPortService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map