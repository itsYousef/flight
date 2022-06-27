import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTripInput } from './dto/create-trip.input';
import { ReadTripInput } from './dto/read-trip.input';
import { ReadTripOutput } from './dto/read-trip.output';
import { UpdateTripInput } from './dto/update-trip.input';
import { FlightService } from './flight.service';
import { TripModel } from './model/trip.model';

@Controller('flight')
export class FlightController {
  constructor(
    private flightService: FlightService
  ) { }

  @Post("createTrip")
  @ApiOperation({ operationId: "createTrip" })
  @ApiBody({ type: CreateTripInput })
  @ApiResponse({ status: 200, type: TripModel })
  createTrip(@Body() input: CreateTripInput) {
    console.log("CreateTrip API...");
    return this.flightService.createTrip(input);
  }

  @Post("readTrip")
  @ApiOperation({ operationId: "readTrip" })
  @ApiBody({ type: ReadTripInput })
  @ApiResponse({ status: 200, type: ReadTripOutput })
  readTrip(@Body() input: ReadTripInput) {
    console.log("ReadTrip API...");
    return this.flightService.readTrip(input);
  }

  @Post("updateTrip")
  @ApiOperation({ operationId: "updateTrip" })
  @ApiBody({ type: UpdateTripInput })
  @ApiResponse({ status: 200, type: TripModel })
  updateTrip(@Body() input: UpdateTripInput) {
    console.log("UpdateTrip API...");
    return this.flightService.updateTrip(input);
  }

  // @Post("deleteTrip")
  // @ApiOperation({ operationId: "deleteTrip" })
  // @ApiBody({ type: DeleteTripInput })
  // @ApiResponse({ status: 200, type: TripModel })
  // deleteTrip(@Body() input: DeleteTripInput) {
  //   console.log("DeleteTrip API...");
  //   return this.flightService.deleteTrip(input);
  // }
}
