import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnprocessableEntityException
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { IamPortService } from '../iamport/iamport.service';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Controller('payment')
@ApiTags('결제 API')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,

    private readonly iamPortService: IamPortService
  ) {}

  @Post('/')
  async createPayment(
    @Param('impUid') impUid: string,
    @Param('amount') amount: number,
    @Body() body
  ): Promise<Payment> {
    const token = await this.iamPortService.fetchToken(impUid);
    const paymentData = await this.iamPortService.fetchPaymentData({
      impUid,
      token,
      amount
    });

    await this.iamPortService.checkDuplicate({ impUid });

    const user = body.user;
    return this.paymentService.create({ impUid, amount, user, paymentData });
  }
}
