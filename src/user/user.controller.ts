import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/helpers/public.decorator';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Payment } from 'src/payments/entities/payment.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Public()
  @ApiOperation({ summary: "Регистрация пользователя" })
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDTO: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDTO)
  }

  @Get('me')
  @ApiOperation({ summary: "Используется для аутентификации на клиенте. Возвращает пользователя" })
  @ApiBearerAuth()
  findOne(@Request() req: Request) {
    const user = req['user']
    return this.userService.getMe(user.username)
  }

  @Get('payments')
  @ApiOperation({ summary: "Возвращает заказы пользователя" })
  @ApiBearerAuth()
  getUsersOrders(@Request() req: Request): Promise<Payment[]> {
    const username = req['user'].username;
    return this.userService.getUsersOrders(username);
  }
}
