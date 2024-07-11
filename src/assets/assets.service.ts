import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UserService } from 'src/user/user.service';
import { Asset } from './entities/asset.entity';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  async getAssetsByUser(id: number): Promise<Asset[]> {
    const assets = await this.userService.getAssetsByUser(id)
    return assets
  }

  // update(id: number, updateAssetDto: UpdateAssetDto) {
  //   return `This action updates a #${id} asset`;
  // }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
