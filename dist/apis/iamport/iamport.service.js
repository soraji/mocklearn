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
exports.IamPortService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../payments/entities/payment.entity");
let IamPortService = class IamPortService {
    constructor(paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }
    async checkDuplicate({ impUid }) {
        const result = await this.paymentsRepository.findOne({ where: { impUid: impUid } });
        if (result)
            throw new common_1.ConflictException('이미 결제가 완료되었습니다');
    }
    async fetchToken(impUid) {
        try {
            const getToken = await (0, axios_1.default)({
                url: "https://api.iamport.kr/users/getToken",
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                    imp_key: process.env.IAMPORT_KEY,
                    imp_secret: process.env.IAMPORT_SECRET
                }
            });
            const access_token = await getToken.data.response.access_token;
            return access_token;
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException(e.response.data.message, e.response.status);
        }
    }
    async fetchPaymentData({ impUid: imp_uid, token, amount }) {
        var _a, _b;
        try {
            const getPaymentData = await (0, axios_1.default)({
                url: `https://api.iamport.kr/payments/${imp_uid}`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            if (getPaymentData.data.response.status !== 'paid')
                throw new common_1.ConflictException('결제 내역이 존재하지 않습니다');
            if (getPaymentData.data.response.amount !== amount)
                throw new common_1.UnprocessableEntityException('잘못된 imp_uid입니다');
            return await getPaymentData.data.response;
        }
        catch (e) {
            if (e.response.status === 404) {
                throw new common_1.UnprocessableEntityException('유효하지 않은 impUid입니다.');
            }
            if ((_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                throw new common_1.HttpException(e.response.data.message, e.response.status);
            }
        }
    }
};
IamPortService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IamPortService);
exports.IamPortService = IamPortService;
//# sourceMappingURL=iamport.service.js.map