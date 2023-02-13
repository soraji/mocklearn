import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { IamPortService } from '../iamport/iamport.service';
import { PaymentController } from './payment.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Payment,
      User
    ]),
  ],
  providers: [
    PaymentService,
    IamPortService
  ],
  controllers:[PaymentController]
})
export class PaymentsModule {}
