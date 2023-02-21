import { Repository } from 'typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { IPaymentsServiceFetchData } from '../payments/interface/payment-service.interface';
export declare class IamPortService {
    private readonly paymentsRepository;
    constructor(paymentsRepository: Repository<Payment>);
    checkDuplicate({ impUid }: {
        impUid: any;
    }): Promise<void>;
    fetchToken(impUid: string): Promise<string>;
    fetchPaymentData({ impUid: imp_uid, token, amount }: IPaymentsServiceFetchData): Promise<any>;
}
