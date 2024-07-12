import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AssetsService } from 'src/assets/assets.service';
import { UserService } from 'src/user/user.service';
import { Comment } from './entities/comment.entity';
import { EntityType } from './helpers/entity.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    private assetService: AssetsService,
    private userService: UserService,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) { }

  async create(createCommentDto: CreateCommentDto, username: string): Promise<Comment> {
    const user = await this.userService.getUserByUsername(username)
    if (!user) throw new NotFoundException("User does not exist")
    if (createCommentDto.senderId !== user.id) {
      throw new ForbiddenException()
    }

    switch (createCommentDto.entityType) {
      case EntityType.ASSET:
        const asset = await this.assetService.findOne(createCommentDto.entityId)
        const comment = new Comment()

        comment.asset = asset;
        comment.author = user;
        comment.isReply = false;
        comment.text = createCommentDto.text
        comment.authorUsername = user.username

        const savedComment = await this.commentRepository.save(comment)
        const savedAsset = await this.assetService.addComment(savedComment, asset)

        return savedComment

      case EntityType.GAME:
        return;
      default:
        throw new BadRequestException()
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
