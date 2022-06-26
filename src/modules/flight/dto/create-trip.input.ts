import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateCityData {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    countryId: string;
}

export class CreateCityInput {
    @Type(() => CreateCityData)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    data: CreateCityData;
}