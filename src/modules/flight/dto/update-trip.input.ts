import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export class UpdateCityData {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    countryId?: string;
}


export class UpdateCityInput {
    @ApiProperty()
    @IsString()
    id: string;

    @Type(() => UpdateCityData)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    data: UpdateCityData;
}