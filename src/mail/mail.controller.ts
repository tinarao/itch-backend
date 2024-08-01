import { Controller, Get, Post, Param, Request, ParseIntPipe, Redirect } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { Public } from 'src/helpers/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post("verify/send")
  create(@Request() req: Request) {
    return this.mailService.sendVerifyingEmail(req['user'].userId);
  }

  @Get("verify/:userId/:verifyKey")
  @Public()
  @Redirect()
  verify(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('verifyKey') verifyKey: string,
  ) {
    return this.mailService.verify(userId, verifyKey)
  }
}
