import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Public } from 'src/helpers/public.decorator';
import { CheckoutDTO } from './dto/checkout.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  @Public()
  @ApiOperation({ summary: "Создание платежа, возвращает всю необходимую для оплаты информацию" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get('details/:orderId')
  @ApiOperation({ summary: "Возвращает статус заказа. Принимает paymentId (не ID заказа, а ID платежа)" })
  getPaymentStatus(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentStatus(orderId);
  }

  @Post("checkout")
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: "Получает http-уведомления от кассы" })
  checkoutCallback(@Body() checkoutDTO: CheckoutDTO) {
    return this.paymentsService.checkout(checkoutDTO);
  }
}
