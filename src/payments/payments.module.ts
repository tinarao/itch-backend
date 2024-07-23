import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/user/entities/user.entity';
import { Asset } from 'src/assets/entities/asset.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Payment, User, Asset])
  ],
})
export class PaymentsModule { }
