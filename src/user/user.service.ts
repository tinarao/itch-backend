import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { Asset } from 'src/assets/entities/asset.entity';
import { Payment } from 'src/payments/entities/payment.entity';

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
    doc.role = createUserDto.role

    return await this.userRepository.save(doc)
  }

  async getAssetsByUser(id: number, username: string): Promise<Asset[]> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { assets: true }
    })
    if (!user) throw new NotFoundException("User does not exist")
    if (user.username !== username) throw new UnauthorizedException();

    return user.assets
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id: id }
    })
  }

  async addAssetToUser(id: number, asset: Asset): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: { assets: true },
      relations: { assets: true }
    })

    if (!user) throw new NotFoundException("User does not exist")

    user.assets.push(asset)

    return await this.userRepository.save(user)
  }

  async attachVerifyCode(userId: number, code: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    })

    user.verifyCode = code;
    await this.userRepository.save(user);

    return true;
  }

  async verify(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    })

    user.verifyCode = null;
    user.isEmailConfirmed = true;
    await this.userRepository.save(user);

    return true;
  }

  async findOne(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [
        { email: email }
      ],
      select: {
        id: true,
        isEmailConfirmed: true,
        email: true,
        username: true,
        password: true
      }
    })
    if (!user) return null

    return user
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username: username },
      relations: {
        assets: true,
        comments: true,
      }
    })
  }

  async getMe(username: string) {
    return this.userRepository.findOne({
      where: { username: username },
    })
  }

  async getUsersOrders(username: string): Promise<Payment[]> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      relations: { orders: true },
    });
    if (!user) {
      throw new NotFoundException("Пользователь не существует");
    }

    return user.orders;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
