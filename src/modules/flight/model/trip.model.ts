import { ApiProperty } from "@nestjs/swagger";

export class CityModel {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty({ type: String })
    name: string;
}