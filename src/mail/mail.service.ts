import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UserService } from 'src/user/user.service';
import { nanoid } from 'nanoid';
import { ResendService } from 'nestjs-resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

  constructor(
    private readonly userService: UserService,
    private readonly resendService: ResendService,
    private readonly configService: ConfigService
  ) { }

  async sendVerifyingEmail(userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException("User does not exist");
    if (user.isEmailConfirmed) throw new BadRequestException("User already verified");

    const verifyCode = nanoid();

    const isCodeAttached = await this.userService.attachVerifyCode(user.id, verifyCode);
    if (!isCodeAttached) throw new InternalServerErrorException();

    // TODO: Fix URL. Shorten it, maybe
    const url = `http://localhost:3000/api/mail/verify/${userId}/${verifyCode}`
    const message = `Для подтверждения адреса электронной почты перейдите по ссылке: ${url}`

    await this.resendService.send({
      from: this.configService.get("RESEND_EMAIL_SENDER"),
      to: user.email,
      subject: 'Подтверждение учётной записи',
      text: message,
    });

    return user;
  }

  async verify(userId: number, verifyKey: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException("User does not exist");
    if (user.isEmailConfirmed) throw new BadRequestException("User already verified");

    if (user.verifyCode !== verifyKey) {
      throw new BadRequestException();
    }

    const isCodeRemoved = await this.userService.verify(userId);

    if (!isCodeRemoved) {
      throw new InternalServerErrorException();
    }

    return { url: 'http://localhost:5173' };
  }
}
