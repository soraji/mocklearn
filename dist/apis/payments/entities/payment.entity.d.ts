import { User } from '../../users/entities/user.entity';
export declare enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = "PAYMENT",
    CANCEL = "CANCEL"
}
export declare class Payment {
    payment_id: string;
    impUid: string;
    amount: number;
    membership: string;
    status: string;
    available_date: Date;
    createdAt: Date;
    user: User;
}
