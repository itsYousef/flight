import { ApiResponseProperty } from "@nestjs/swagger";

export class AircraftModel {
    @ApiResponseProperty({ type: String })
    _id: string;

    @ApiResponseProperty({ type: String })
    name: string;
}