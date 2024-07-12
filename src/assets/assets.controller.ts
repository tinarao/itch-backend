import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/helpers/public.decorator';
import { DeleteResult } from 'typeorm';
import { ChangeVisibilityDTO } from './dto/change-visibility.dto';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Post()
  @ApiOperation({ summary: 'Create asset' })
  @UsePipes(new ValidationPipe())
  create(
    @Body() createAssetDto: CreateAssetDto,
    @Request() req: Request
  ) {
    const username = req['user'].username
    return this.assetsService.create(createAssetDto, username);
  }

  @Get('feed')
  @Public()
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.assetsService.getAssetsForFeed(page);
  }

  @Get('id/:id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.findOne(id);
  }

  @Get('my/:id')
  findMyPostById(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.findMyPostById(id)
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get all user\'s assets. Used in profile page' })
  getAssetsProfile(@Query('userId', ParseIntPipe) userId: number) {
    return this.assetsService.getAssetsByUser(userId);
  }

  @ApiOperation({ summary: "Endpoint that can change visibility of asset" })
  @Patch('visibility/:id')
  async changeVisibility(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeVisibilityDTO: ChangeVisibilityDTO,
    @Request() req: Request
  ) {
    const username = req['user'].username
    return this.assetsService.changeVisibility(id, changeVisibilityDTO, username)
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: string,
    @Request() req: Request
  ): Promise<DeleteResult> {
    const username = req['user'].username
    return this.assetsService.remove(+id, username);
  }
}
