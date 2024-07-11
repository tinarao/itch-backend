import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UserService } from 'src/user/user.service';
import { Asset } from './entities/asset.entity';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ChangeVisibilityDTO } from './dto/change-visibility.dto';

@Injectable()
export class AssetsService {

  constructor(
    private userService: UserService,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>
  ) { }

  async create(createAssetDto: CreateAssetDto, username: string) {
    const user = await this.userService.getUserById(createAssetDto.userId)
    if (!user) throw new NotFoundException("User does not exist")
    if (user.username !== username) {
      throw new BadRequestException("Wrong user credentials provided")
    }

    const assetDoc = new Asset()
    assetDoc.name = createAssetDto.name
    assetDoc.free = createAssetDto.free
    assetDoc.price = createAssetDto.price
    assetDoc.fileURL = createAssetDto.fileURL
    assetDoc.author = user
    assetDoc.description = createAssetDto.description

    if (createAssetDto.genre) {
      assetDoc.genre = createAssetDto.genre
    }
    if (createAssetDto.coverPictureUrl) {
      assetDoc.coverPictureUrl = createAssetDto.coverPictureUrl
    }

    const savedAsset = await this.assetRepository.save(assetDoc)
    const savedUser = await this.userService.addAssetToUser(user.id, savedAsset)

    return { savedAsset, savedUser };
  }

  findAll() {
    return `This action returns all assets`;
  }

  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetRepository.findOne(
      { where: { id: id } }
    )

    if (!asset) {
      throw new NotFoundException("Resourse does not exist")
    }

    if (!asset.public) {
      throw new UnauthorizedException("Автор закрыл доступ к ресурсу")
    }

    return asset
  }

  async findMyPostById(id: number) {
    return this.assetRepository.findOne({ where: { id: id } })
  }

  async getAssetsByUser(id: number): Promise<Asset[]> {
    const assets = await this.userService.getAssetsByUser(id)
    return assets
  }

  // update(id: number, updateAssetDto: UpdateAssetDto) {
  //   return `This action updates a #${id} asset`;
  // }

  async remove(id: number, username: string): Promise<DeleteResult> {
    const asset = await this.assetRepository.findOne({ where: { id: id }, relations: { author: true } })
    if (!asset) throw new NotFoundException("Asset does not exist")
    if (asset.author.username !== username) throw new ForbiddenException("Forbidden");

    return await this.assetRepository.delete(asset.id)
  }

  async changeVisibility(id: number, dto: ChangeVisibilityDTO, username: string): Promise<Asset> {
    const asset = await this.assetRepository.findOne({ where: { id: id }, relations: { author: true } })
    if (!asset) throw new NotFoundException("Asset does not exist");
    if (asset.author.username !== username) throw new ForbiddenException("Forbidden");

    asset.public = dto.public
    return await this.assetRepository.save(asset)
  }
}
