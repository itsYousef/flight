import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class LegInputData {
    @ApiProperty({ type: Date })
    @IsDateString()
    startDate: string;

    @ApiProperty({ type: Date })
    @IsDateString()
    endDate: string;

    @ApiProperty()
    @IsString()
    departureId: string;      // ObjectId (Location)

    @ApiProperty()
    @IsString()
    destinationId: string;    // ObjectId (Location)

    @ApiProperty()
    @IsString()
    aircraftId: string;       // ObjectId (Aircraft)
}

export class CreateTripData {
    @ApiProperty({ type: [LegInputData] })
    @IsArray()
    @ValidateNested()
    @Type(() => LegInputData)
    legs: [LegInputData];
}

export class CreateTripInput {
    @Type(() => CreateTripData)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    data: CreateTripData;
}