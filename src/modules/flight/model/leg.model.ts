import { ApiResponseProperty } from "@nestjs/swagger";
import { AircraftModel } from "./aircraft.model";
import { LocationModel } from "./location.model";

export class LegModel {
    @ApiResponseProperty({ type: String })
    _id: string;

    @ApiResponseProperty({ type: Date })
    startDate: Date;

    @ApiResponseProperty({ type: Date })
    endDate: Date;

    @ApiResponseProperty()
    departure: LocationModel;

    @ApiResponseProperty()
    destination: LocationModel;

    @ApiResponseProperty()
    aircraft: AircraftModel;
}