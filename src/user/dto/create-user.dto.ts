import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    @MinLength(8, { message: "Слишком короткий пароль" })
    password: string
}
