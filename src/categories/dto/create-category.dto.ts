import { MaxLength, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string | null;
}

