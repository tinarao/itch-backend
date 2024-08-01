import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsBooleanString, IsEnum, IsNumber, IsString, IsUrl } from "class-validator";
import { AssetCategories, AssetPixelSize, Genres } from "src/helpers/assets.enum";

export class CreateAssetDto {
    @ApiProperty()
    @IsNumber()
    userId: number

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    @IsBoolean()
    free: boolean

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsString()
    fileURL: string

    @ApiProperty()
    coverPictureUrl?: string

    @ApiProperty()
    imagesURLs?: string[]

    @ApiProperty()
    pixelArtSize?: AssetPixelSize

    @ApiProperty()
    @IsArray()
    tags?: string[]

    @ApiProperty()
    @IsArray()
    categories: AssetCategories[]

    @ApiProperty()
    @IsEnum(Genres)
    genre?: Genres
}
