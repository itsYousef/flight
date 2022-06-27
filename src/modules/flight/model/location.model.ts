import { ApiResponseProperty } from "@nestjs/swagger";

export class LocationModel {
    @ApiResponseProperty({ type: String })
    _id: string;

    @ApiResponseProperty({ type: String })
    name: string;
}