import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Payment, POINT_TRANSACTION_STATUS_ENUM } from './entities/payment.entity';
export declare class PaymentService {
    private readonly paymentsRepository;
    private readonly userRepository;
    constructor(paymentsRepository: Repository<Payment>, userRepository: Repository<User>);
    create({ impUid, amount: _amount, user: _user, status, paymentData }: {
        impUid: any;
        amount: any;
        user: any;
        status?: POINT_TRANSACTION_STATUS_ENUM;
        paymentData: any;
    }): Promise<Payment>;
    checkAlreadyCanceled(impUid: any): Promise<void>;
    checkHasCancelableMoney({ impUid, user: _user }: {
        impUid: any;
        user: any;
    }): Promise<void>;
    cancelPaymentTable({ impUid, amount, user: _user, paymentData }: {
        impUid: any;
        amount: any;
        user: any;
        paymentData: any;
    }): Promise<Payment>;
}
