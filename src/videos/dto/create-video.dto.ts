import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateVideoDto {
    @ApiProperty() // declarando o tipo do arquivo para o swagger
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @ApiProperty({ type: String, nullable: true }) // declarando o tipo do arquivo para o swagger
    @IsOptional()
    @IsString()
    description: string | null;

    @ApiProperty() // declarando o tipo do arquivo para o swagger
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    category_id: number;
}

export class CreateVideoWithUploadDto extends CreateVideoDto {
    @ApiProperty({ type: 'string', format: 'binary' }) // declarando o tipo do arquivo para o swagger
    file: string;

}