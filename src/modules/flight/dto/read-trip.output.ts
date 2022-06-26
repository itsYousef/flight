import { ApiResponseProperty } from "@nestjs/swagger";
import { CityModel } from "../model/trip.model";

export class ReadCityOutput {
    @ApiResponseProperty({ type: [CityModel] })
    data: CityModel[];

    @ApiResponseProperty()
    count: number;
}