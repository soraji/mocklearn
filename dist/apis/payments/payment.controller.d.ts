import { IamPortService } from "../iamport/iamport.service";
import { Payment } from "./entities/payment.entity";
import { PaymentService } from "./payment.service";
export declare class PaymentController {
    private readonly paymentService;
    private readonly iamPortService;
    constructor(paymentService: PaymentService, iamPortService: IamPortService);
    createPayment(impUid: string, amount: number, request: any): Promise<Payment>;
}
