import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ description: 'name of category' })
    @IsString()
    name:string;
    @ApiProperty({ description: 'image of category' })
    @IsString()
    @IsOptional()
    image:string;
}