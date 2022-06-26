import { Controller } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flight')
export class FlightController {
  constructor(
    private flightService: FlightService
  ) { }

  // @Post("createFlight")
  // @ApiOperation({ operationId: "createFlight" })
  // @ApiBody({ type: CreateFlightInput })
  // @ApiResponse({ status: 200, type: FlightModel })
  // createFlight(@Body() input: CreateFlightInput) {
  //   console.log("CreateFlight API...");
  //   return this.flightService.createFlight(input);
  // }

  // @Post("readFlight")
  // @ApiOperation({ operationId: "readFlight" })
  // @ApiBody({ type: ReadFlightInput })
  // @ApiResponse({ status: 200, type: ReadFlightOutput })
  // readFlight(@Body() input: ReadFlightInput) {
  //   console.log("ReadFlight API...");
  //   return this.flightService.readFlight(input);
  // }

  // @Post("readFlightCities")
  // @ApiOperation({ operationId: "readFlightCities" })
  // @ApiBody({ type: ReadFlightCitiesInput })
  // @ApiResponse({ status: 200, type: ReadFlightCitiesOutput })
  // readFlightCities(@Body() input: ReadFlightCitiesInput) {
  //   console.log("ReadFlightCities API...");
  //   return this.flightService.readFlightCities(input);
  // }

  // @Post("updateFlight")
  // @ApiOperation({ operationId: "updateFlight" })
  // @ApiBody({ type: UpdateFlightInput })
  // @ApiResponse({ status: 200, type: FlightModel })
  // updateFlight(@Body() input: UpdateFlightInput) {
  //   console.log("UpdateFlight API...");
  //   return this.flightService.updateFlight(input);
  // }

  // @Post("deleteFlight")
  // @ApiOperation({ operationId: "deleteFlight" })
  // @ApiBody({ type: DeleteFlightInput })
  // @ApiResponse({ status: 200, type: FlightModel })
  // deleteFlight(@Body() input: DeleteFlightInput) {
  //   console.log("DeleteFlight API...");
  //   return this.flightService.deleteFlight(input);
  // }
}
