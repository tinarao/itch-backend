import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Asset])
  ]
})
export class AssetsModule { }
