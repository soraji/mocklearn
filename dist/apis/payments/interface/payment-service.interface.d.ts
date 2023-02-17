export interface IPaymentsServiceCreate {
    impUid: string;
    amount: number;
}
export interface IPaymentsServiceCancel {
    impUid: string;
    amount: number;
    token: string;
}
export interface IPaymentsServiceFetchData {
    impUid: string;
    token: string;
    amount: number;
}
