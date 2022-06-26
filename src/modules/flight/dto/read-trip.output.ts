import { ApiResponseProperty } from "@nestjs/swagger";
import { TripModel } from "../model/trip.model";

export class ReadTripOutput {
    @ApiResponseProperty({ type: [TripModel] })
    data: TripModel[];

    @ApiResponseProperty()
    count: number;
}