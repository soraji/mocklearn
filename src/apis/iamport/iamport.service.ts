import { ConflictException, HttpException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { Repository } from "typeorm";
import { resourceLimits } from "worker_threads";
import { Payment } from "../payments/entities/payment.entity";
import { IPaymentsServiceFetchData } from "../payments/interface/payment-service.interface";
import { User } from "../users/entities/user.entity";

@Injectable()
export class IamPortService {
  constructor(
      @InjectRepository(Payment)
      private readonly paymentsRepository: Repository<Payment>,
  
    ){}

    
  async checkDuplicate({ impUid }){
    const result = await this.paymentsRepository.findOne({ where : { impUid : impUid } })
    if(result) throw new ConflictException('이미 결제가 완료되었습니다');
  }


    //결제정보 조회하기
  async fetchToken(impUid :string): Promise<string>{
    try{
      //아임포트에서 토큰을 받아오기
      const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post", // POST method
        headers: { "Content-Type": "application/json" }, 
        data: {
          imp_key: process.env.IAMPORT_KEY,
          imp_secret: process.env.IAMPORT_SECRET
        }
      });

      const access_token = await getToken.data.response.access_token; // 인증 토큰
      return access_token;

    }catch(e){
      console.log(e)
      throw new HttpException(
        e.response.data.message,
        e.response.status
      )
    }
  }


  //결제정보 아임포트에서 가져오기(원두쌤checkpaid와 같음 함수)
  async fetchPaymentData( { impUid : imp_uid, token, amount }: IPaymentsServiceFetchData){
    try{
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, 
        method: "get", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token } 
      });

      if(getPaymentData.data.response.status !== 'paid') throw new ConflictException('결제 내역이 존재하지 않습니다')

      if(getPaymentData.data.response.amount !== amount) throw new UnprocessableEntityException('잘못된 imp_uid입니다')

      return await getPaymentData.data.response;
    }catch(e){
      if (e.response.status === 404) {
        throw new UnprocessableEntityException('유효하지 않은 impUid입니다.');
      }
      if(e?.response?.data?.message){  //아임포트 서버에서 받는 에러내용. 아임포트에러와 내가 만들어준 에러를 구분해서 써준다
        throw new HttpException(
          e.response.data.message,
          e.response.status
        )
      }
    }
    
  }

}
  