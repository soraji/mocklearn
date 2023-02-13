import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Payment, POINT_TRANSACTION_STATUS_ENUM } from './entities/payment.entity';
import { IPaymentsServiceCreate, IPaymentsServiceCancel } from './interface/payment-service.interface';



@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,


  ){}


  //결제 테이블에 결제 내역 생성
  async create({ impUid, amount:_amount, user:_user, status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT, paymentData } ): Promise<Payment> {   //status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT은 디폴트값을 설정해주는 문법. 만약에 어디선가 status에 새로운 값이 있으면 새로운 값으로 넣어준다

    try{
      const payment = this.paymentsRepository.create({
        impUid,
        amount : _amount,
        user : _user,
        status,
      })
  
      //결제 데이터를 결제 테이블에 추가
      await this.paymentsRepository.save(payment);
      // await queryRunner.manager.save(payment);  //queryRunner를 통해서 저장해야함. 그래야 트랜젝션 먹힘
  
      //user테이블에 동기화(누적금액으로)
      const user = await this.userRepository.findOne({ where : { id : _user.id } })
      // const user = await queryRunner.manager.findOne(User, {
      //   where: { id: _user.id }, // row-lock
      //   lock: { mode: 'pessimistic_write' },
      // });
      // console.log(`유저가 이미 결제한 내역은 ${user.paid}이며, 이번에 새로 결제한 금액은 ${_amount}입니다`)

      await this.userRepository.update({ id: user.id },{ paid: user.paid + _amount })
      // const updatedUser = this.userRepository.create({
      //   ...user,
      //   paid : user.paid + _amount,
      // });
      // await queryRunner.manager.save(updatedUser);
      // await queryRunner.commitTransaction();
  
      // console.log(payment)
      //결제 데이터를 클라이언트에 리턴
      return payment;
    }catch(e){
      // await queryRunner.rollbackTransaction();
    }finally{
      // await queryRunner.release();
    }
    
  }

  //결제 테이블에서 이미 결제가 취소되었는지 검증
  async checkAlreadyCanceled( impUid ){
    const alreadyPaid = await this.paymentsRepository.findOne({ where : { impUid : impUid, status: 'CANCEL' } })
    // 이미 취소된 결제라면 UnprocessableEntityException 에러
    if( alreadyPaid ) throw new UnprocessableEntityException("이미 결제가 취소되었습니다");

  }

  async checkHasCancelableMoney({ impUid, user:_user }){
    const hasMoney = await this.paymentsRepository.findOne({ 
      where : { 
        impUid : impUid, //
        user : { id: _user.id }, //user가 현재 로그인한 유저인지(다른 사람이 충전했을수도 있으니)
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT 
      } 
    })
    if(!hasMoney) throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다')

    const user = await this.userRepository.findOne({ where : { id : _user.id } })
    // if(user.paid < hasMoney.amount) throw new UnprocessableEntityException('환불 요청 금액이 결제 금액보다 많습니다')
  }

  async cancelPaymentTable({ impUid, amount, user:_user, paymentData }){

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction('SERIALIZABLE');

    try{
      const payment = await this.create({
        impUid, //
        amount : -amount,
        user : _user,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
        paymentData
      })
      // await queryRunner.manager.save(payment);
      // await queryRunner.commitTransaction();
  
      return payment;
    }catch(e){
      // await queryRunner.rollbackTransaction();
    }finally{
      // await queryRunner.release();
    }
    
  }
  
}
