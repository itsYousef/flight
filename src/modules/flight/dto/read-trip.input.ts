import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { PaginationData } from "src/common/pagination";
import { SortByData } from "src/common/sort-by";

export class CityWhereData {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    id?: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ isArray: true, type: String })
    @IsOptional()
    @IsArray()
    countryId?: string[];

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    nameSort?: string;
}


export class ReadCityInput {
    @Type(() => CityWhereData)
    @ApiPropertyOptional()
    @IsOptional()
    @ValidateNested()
    where?: CityWhereData;

    @Type(() => PaginationData)
    @ApiPropertyOptional()
    @IsOptional()
    @ValidateNested()
    pagination?: PaginationData;

    @Type(() => SortByData)
    @ApiPropertyOptional()
    @IsOptional()
    @ValidateNested()
    sortBy?: SortByData;
}