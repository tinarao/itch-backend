import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/helpers/public.decorator';
import { ApiHeader, ApiHeaders } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Public()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDTO: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDTO)
  }

  @Get('me')
  findOne(@Request() req: Request) {
    const user = req['user']
    return this.userService.getMe(user.username)
  }
}
