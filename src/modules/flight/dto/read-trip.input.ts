import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { PaginationData } from "src/common/pagination";
import { SortByData } from "src/common/sort-by";

export class TripWhereData {
    @ApiProperty()
    @IsString()
    id: string;
}


export class ReadTripInput {
    @Type(() => TripWhereData)
    @ApiPropertyOptional()
    @IsOptional()
    @ValidateNested()
    where?: TripWhereData;

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