// import { IAuthUser } from "src/commons/types/context";

export interface IPaymentsServiceCreate{
  impUid : string;
  amount : number;
  // user : IAuthUser['user'];
}

export interface IPaymentsServiceCancel{
  impUid : string;
  amount : number;
  // user : IAuthUser['user'];
  token : string;
}

export interface IPaymentsServiceFetchData{
  impUid : string;
  token: string
  amount : number;
}
