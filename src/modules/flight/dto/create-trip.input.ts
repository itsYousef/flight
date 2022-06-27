import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class LegCreateInputData {
    @ApiProperty({ type: Date })
    @IsDateString()
    startDate: Date;

    @ApiProperty({ type: Date })
    @IsDateString()
    endDate: Date;

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
    @ApiProperty({ type: [LegCreateInputData] })
    @IsArray()
    @ValidateNested()
    @Type(() => LegCreateInputData)
    legs: [LegCreateInputData];
}

export class CreateTripInput {
    @Type(() => CreateTripData)
    @ApiProperty()
    @IsNotEmpty()
    @ValidateNested()
    data: CreateTripData;
}