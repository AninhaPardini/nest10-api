import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateVideoDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    description: string | null;

    @Min(1)
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    category_id: number;
}
