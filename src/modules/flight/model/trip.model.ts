import { ApiResponseProperty } from "@nestjs/swagger";
import { LegModel } from "./leg.model";

export class TripModel {
    @ApiResponseProperty({ type: String })
    _id: string;

    @ApiResponseProperty({ type: String })
    tripNo: string;

    @ApiResponseProperty({ type: [LegModel] })
    legs: LegModel[];
}