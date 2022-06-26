import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class DeleteCityInput {
    @ApiProperty()
    @IsString()
    id: string;
}