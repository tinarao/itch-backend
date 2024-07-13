import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { EntityType } from "../helpers/entity.enum"

export class CreateCommentDto {
    @ApiProperty()
    @IsNumber()
    senderId: number

    @IsString()
    @MinLength(1, { message: "Комментарий не может быть пустым" })
    @MaxLength(500, { message: "Слишком длинный комментарий" })
    @ApiProperty({ description: "Тело комментария" })
    text: string

    @IsEnum(EntityType)
    @ApiProperty({ description: "Тип сущности. Комметарий или ассет" })
    entityType: EntityType

    @IsNumber()
    @ApiProperty({ description: "ID сущности" })
    entityId: number
}
