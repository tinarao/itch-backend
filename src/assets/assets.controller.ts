import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/helpers/public.decorator';
import { DeleteResult } from 'typeorm';
import { ChangeVisibilityDTO } from './dto/change-visibility.dto';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Post()
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Создание ассета' })
  create(
    @Body() createAssetDto: CreateAssetDto,
    @Request() req: Request
  ) {
    const username = req['user'].username
    return this.assetsService.create(createAssetDto, username);
  }

  @Get('feed')
  @ApiOperation({ summary: "Возвращает ассеты для отображения на главной и в рекомендациях" })
  @Public()
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.assetsService.getAssetsForFeed(page);
  }

  @Get('id/:id')
  @Public()
  @ApiOperation({ summary: "Возвращает данные об ассете. Используется для отрисовки на странице ассета" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.findOne(id);
  }

  @Get('my/:id')
  @ApiOperation({ summary: "Возвращает данные об ассете. Используется для отрисовки в профиле" })
  @ApiBearerAuth()
  findMyPostById(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.findMyPostById(id)
  }

  @Get('most-viewed')
  @Public()
  @ApiOperation({ summary: "Возвращает самые просматриваемые ассеты" })
  findMostViewedAssets() {
    return this.assetsService.getMostViewedAssets();
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Возвращает все ассеты пользователя, в т.ч. скрытые' })
  getAssetsProfile(
    @Query('userId', ParseIntPipe) userId: number,
    @Request() req: Request
  ) {
    return this.assetsService.getAssetsByUser(userId, req['user'].username);
  }

  @Patch('visibility/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Меняет видимость ассета. Скрывает / публикует" })
  async changeVisibility(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeVisibilityDTO: ChangeVisibilityDTO,
    @Request() req: Request
  ) {
    const username = req['user'].username
    return this.assetsService.changeVisibility(id, changeVisibilityDTO, username)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Удаление ассета" })
  remove(
    @Param('id', ParseIntPipe) id: string,
    @Request() req: Request
  ): Promise<DeleteResult> {
    const username = req['user'].username
    return this.assetsService.remove(+id, username);
  }
}
