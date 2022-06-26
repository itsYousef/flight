import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class DateRange {
    _startDate?: string;
    _endDate?: string;

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    public set startDate(startDate: string) {
        this._startDate = startDate ? startDate : undefined;
    }

    public get startDate() {
        return this._startDate;
    }

    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    public set endDate(endDate: string) {
        this._endDate = endDate ? endDate : undefined;
    }

    public get endDate() {
        return this._endDate;
    }
}