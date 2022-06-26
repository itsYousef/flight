import { ApiProperty } from "@nestjs/swagger";

export class TripModel {
    @ApiProperty({ type: String })
    _id: string;

    @ApiProperty({ type: String })
    name: string;
}