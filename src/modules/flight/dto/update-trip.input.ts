import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class LegUpdateInputData {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    id?: string;

    @ApiPropertyOptional({ type: Date })
    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @ApiPropertyOptional({ type: Date })
    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    departureId?: string;      // ObjectId (Location)

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    destinationId?: string;    // ObjectId (Location)

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    aircraftId?: string;       // ObjectId (Aircraft)
}

export class UpdateTripData {
    @ApiProperty({ type: [LegUpdateInputData] })
    @IsArray()
    @ValidateNested()
    @Type(() => LegUpdateInputData)
    legs: [LegUpdateInputData];
}


export class UpdateTripInput {
    @ApiProperty()
    @IsString()
    id: string;

    @Type(() => UpdateTripData)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    data: UpdateTripData;
}