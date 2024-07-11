import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class ChangeVisibilityDTO {
    @IsBoolean()
    @ApiProperty()
    public: boolean
}