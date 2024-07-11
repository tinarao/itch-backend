import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const sameCredsUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username.toLowerCase() }
      ]
    })

    if (!!sameCredsUser) {
      throw new BadRequestException("User with this credentials already exist");
    }

    const doc = new User()

    const saltOrRounds = 10;
    const password = createUserDto.password;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    doc.username = createUserDto.username.toLowerCase()
    doc.email = createUserDto.email
    doc.password = passwordHash

    return await this.userRepository.save(doc)
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [
        { email: email }
      ],
      select: {
        email: true,
        username: true,
        password: true
      }
    })
    if (!user) return null

    return user
  }

  async findMe(username: string) {
    return this.userRepository.findOne({
      where: { username: username }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
