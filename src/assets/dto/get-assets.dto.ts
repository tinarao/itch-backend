import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetAssetsProfileDTO {
    @ApiProperty()
    @IsString()
    userId: string

    @ApiProperty()
    @IsString()
    username: string
}