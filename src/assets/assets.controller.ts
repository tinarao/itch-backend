import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { GetAssetsProfileDTO } from './dto/get-assets.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/helpers/public.decorator';

@Controller('assets')
@ApiTags('Assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Post()
  @ApiOperation({ summary: 'Create asset' })
  @UsePipes(new ValidationPipe())
  create(
    @Body() createAssetDto: CreateAssetDto,
    @Request() req
  ) {
    const username = req['user'].username
    return this.assetsService.create(createAssetDto, username);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }

  @Get('id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.findOne(id);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get all user\'s assets. Used in profile page' })
  getAssetsProfile(@Query('userId', ParseIntPipe) userId: number) {
    return this.assetsService.getAssetsByUser(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetsService.update(+id, updateAssetDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
