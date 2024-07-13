import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/helpers/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Создание комментария" })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: Request
  ) {
    const user = req['user'].username
    return this.commentsService.create(createCommentDto, user)
    // return this.commentsService.create(createCommentDto, username);
  }
}
