import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { set } from 'mongoose';
import { Aircraft, AircraftSchema } from 'schemas/aircraft.schema';
import { Leg, LegSchema } from 'schemas/leg.schema';
import { Location, LocationSchema } from 'schemas/location.schema';
import { Trip, TripSchema } from 'schemas/trip.schema';
import { MongoService } from './mongo.service';

@Module({
  providers: [MongoService],
  imports: [
    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema },
      { name: Leg.name, schema: LegSchema },
      { name: Aircraft.name, schema: AircraftSchema },
      { name: Location.name, schema: LocationSchema },
    ])
  ],
  exports: [MongoService]
})
export class MongoModule {
  constructor() {
    set('returnOriginal', false);
  }
}
