import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from "./payment.service";

@Controller('payment')
@ApiTags('결제 API')
export class PaymentController{
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  
}