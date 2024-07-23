import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatuses } from './entities/payment.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Asset } from 'src/assets/entities/asset.entity';
import { NotFoundError } from 'rxjs';
import { CheckoutDTO } from './dto/checkout.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private configService: ConfigService,

    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,

    private dataSource: DataSource
  ) { }

  async getPaymentStatus(orderId: string) {
    const payment = await this.paymentRepository.findOne({
      where: { paymentId: orderId }
    });
    if (!payment) throw new NotFoundException();
    return payment.status;
  }

  async checkout(checkoutDto: CheckoutDTO) {
    console.log(checkoutDto);
    return checkoutDto;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const user = await this.userRepository.findOne({ where: { id: createPaymentDto.userId } });
    if (!user) throw new BadRequestException("Invalid user credentials");

    const asset = await this.assetRepository.findOne({ where: { id: createPaymentDto.assetId } });
    if (!asset) throw new BadRequestException("Invalid asset data");

    const orderId = nanoid(30);
    const description = `
    Покупка ассета \"${asset.name}\" 
    пользователем \"${user.username}\" 
    на сумму ${createPaymentDto.value} руб.
    `;

    const payload = {
      amount: {
        value: createPaymentDto.value,
        currency: createPaymentDto.currency
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: this.configService.get('YOOKASSA_CALLBACK_URL')
      },
      description: description,
      metadata: {
        orderId: orderId,
        assetId: createPaymentDto.assetId,
        userId: createPaymentDto.userId
      },
    }

    const auth = {
      username: this.configService.get("YOOMONEY_SHOP_ID"),
      password: this.configService.get("YOOMONEY_API_KEY")
    }

    const res = await axios.post(
      "https://api.yookassa.ru/v3/payments",
      payload,
      {
        validateStatus: status => true, // with this thing axios does not throw on !2xx codes
        auth: auth,
        headers: {
          // TODO:
          'Idempotence-Key': orderId,
        }
      }
    )

    if (res.status !== 200) {
      throw new InternalServerErrorException();
    }

    return res.data;

    // const paymentDoc = new Payment();
    // paymentDoc.asset = asset;
    // paymentDoc.buyer = user;
    // paymentDoc.paymentId = orderId;

    // let savedPayment: Payment;

    // await this.dataSource.transaction(async manager => {
    //   savedPayment = await manager.save(paymentDoc);

    //   user.orders.push(savedPayment);
    //   asset.purchases.push(savedPayment);

    //   await manager.save(user);
    //   await manager.save(asset);
    // });

    // return res.data;
  }
}

