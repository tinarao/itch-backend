import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsBooleanString, IsEnum, IsNumber, IsString, IsUrl } from "class-validator";
import { Genres } from "src/helpers/assets.enum";

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
    @IsEnum(Genres)
    genre?: Genres
}
