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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const payment_entity_1 = require("./entities/payment.entity");
let PaymentService = class PaymentService {
    constructor(paymentsRepository, userRepository) {
        this.paymentsRepository = paymentsRepository;
        this.userRepository = userRepository;
    }
    async create({ impUid, amount: _amount, user: _user, status = payment_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT, paymentData }) {
        try {
            const payment = this.paymentsRepository.create({
                impUid,
                amount: _amount,
                user: _user,
                status,
            });
            await this.paymentsRepository.save(payment);
            const user = await this.userRepository.findOne({ where: { id: _user.id } });
            await this.userRepository.update({ id: user.id }, { paid: user.paid + _amount });
            return payment;
        }
        catch (e) {
        }
        finally {
        }
    }
    async checkAlreadyCanceled(impUid) {
        const alreadyPaid = await this.paymentsRepository.findOne({ where: { impUid: impUid, status: 'CANCEL' } });
        if (alreadyPaid)
            throw new common_1.UnprocessableEntityException("이미 결제가 취소되었습니다");
    }
    async checkHasCancelableMoney({ impUid, user: _user }) {
        const hasMoney = await this.paymentsRepository.findOne({
            where: {
                impUid: impUid,
                user: { id: _user.id },
                status: payment_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT
            }
        });
        if (!hasMoney)
            throw new common_1.UnprocessableEntityException('결제 기록이 존재하지 않습니다');
        const user = await this.userRepository.findOne({ where: { id: _user.id } });
    }
    async cancelPaymentTable({ impUid, amount, user: _user, paymentData }) {
        try {
            const payment = await this.create({
                impUid,
                amount: -amount,
                user: _user,
                status: payment_entity_1.POINT_TRANSACTION_STATUS_ENUM.CANCEL,
                paymentData
            });
            return payment;
        }
        catch (e) {
        }
        finally {
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map