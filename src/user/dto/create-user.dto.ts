import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Roles } from "../entities/user.entity";

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

    @ApiProperty()
    @IsEnum(Roles)
    role: Roles
}
