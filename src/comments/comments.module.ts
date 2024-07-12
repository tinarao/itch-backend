import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

import { UserModule } from 'src/user/user.module';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  imports: [
    UserModule,
    AssetsModule,
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
