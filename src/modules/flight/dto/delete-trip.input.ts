import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class DeleteTripInput {
    @ApiProperty()
    @IsString()
    id: string;
}