import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findOne(loginDTO.email);
    if (!user) {
      throw new NotFoundException("User does not exist")
    }

    const verified = bcrypt.compareSync(loginDTO.password, user.password);
    if (!verified || !user) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, username: user.username, userId: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        isEmailConfirmed: user.isEmailConfirmed
      }
    }
  }
}
