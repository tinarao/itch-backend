import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UserModule } from 'src/user/user.module';
import { ResendModule } from 'nestjs-resend';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [
    UserModule,
    ConfigModule,
    ResendModule.forAsyncRoot({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get("RESEND_API_KEY")
      })
    })
  ]
})
export class MailModule { }
