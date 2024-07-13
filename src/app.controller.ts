import { Controller, Get } from '@nestjs/common';
import { Public } from './helpers/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('healthcheck')
  @Public()
  @ApiTags("Healthcheck")
  @ApiOperation({ summary: "Проверка, живой ли сервер" })
  // @Summar
  healthcheck() {
    return "We are alive"
  }
}
