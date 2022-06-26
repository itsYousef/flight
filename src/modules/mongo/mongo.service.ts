import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aircraft, AircraftDocument } from 'schemas/aircraft.schema';
import { Leg, LegDocument } from 'schemas/leg.schema';
import { Location, LocationDocument } from 'schemas/location.schema';
import { Trip, TripDocument } from 'schemas/trip.schema';


@Injectable()
export class MongoService {
    constructor(
        @InjectModel(Trip.name) private tripM: Model<TripDocument>,
        @InjectModel(Leg.name) private legM: Model<LegDocument>,
        @InjectModel(Aircraft.name) private aircraftM: Model<AircraftDocument>,
        @InjectModel(Location.name) private locationM: Model<LocationDocument>
    ) { }

    get tripModel() {
        return this.tripM;
    }

    get legModel() {
        return this.legM;
    }

    get aircraftModel() {
        return this.aircraftM;
    }

    get locationModel() {
        return this.locationM;
    }
}
