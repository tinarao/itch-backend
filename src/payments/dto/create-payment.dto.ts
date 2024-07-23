import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Currencies } from "./currency.enum";

export class CreatePaymentDto {
    @ApiProperty()
    @IsNumber()
    value: number;

    @ApiProperty()
    @IsEnum(Currencies)
    currency: Currencies;

    @ApiProperty()
    @IsNumber()
    assetId: number;

    @ApiProperty()
    @IsNumber()
    userId: number;
}
