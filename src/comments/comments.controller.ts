import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from 'src/helpers/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: Request
  ) {
    const user = req['user'].username
    return this.commentsService.create(createCommentDto, user)
    // return this.commentsService.create(createCommentDto, username);
  }

  // @Get()
  // @Public()
  // findCommentsToAsset(@Query('assetId', ParseIntPipe) assetId: number) {
  //   return this.commentsService.findCommentsToAsset(assetId);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
