import { Injectable } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';
import { CreateTripInput } from './dto/create-trip.input';
import { DeleteTripInput } from './dto/delete-trip.input';
import { ReadTripInput } from './dto/read-trip.input';
import { ReadTripOutput } from './dto/read-trip.output';
import { UpdateTripInput } from './dto/update-trip.input';
import { TripModel } from './model/trip.model';

type LegData = {
  startDate?: Date;
  endDate?: Date;
  departureId?: string;
  destinationId?: string;
  aircraftId?: string;
}
@Injectable()
export class FlightService {
  constructor(
    private mongo: MongoService
  ) { }

  async validateData(legs: LegData[]) {
    let prevEndDate = null;
    let prevDestination = null;

    // validate trip legs
    for (const leg of legs) {
      if (leg.endDate <= leg.startDate)
        throw Error("endDate must be larger than startDate.");

      if (prevEndDate && (leg.startDate <= prevEndDate))
        throw Error("startDate must be larger than previous endDate.");

      if (prevDestination && (leg.departureId != prevDestination))
        throw Error("departure must be same as last leg destination.");

      if (leg.departureId == leg.destinationId)
        throw Error("departure and destination cannot be same.");


      prevDestination = leg.destinationId;
      prevEndDate = leg.endDate;
    }

    let firstLeg = legs[0];
    let lastLeg = legs[legs.length - 1];

    // validate legs across trips
    const beforeLeg = (await this.mongo.legModel.find({
      aircraftId: firstLeg.aircraftId,
      endDate: { $lte: firstLeg.startDate }
    }, null, {
      limit: 1,
      sort: { endDate: -1 }
    }))[0];
    // console.log("🚀 ~ FlightService ~ validateData ~ beforeLeg", beforeLeg)

    const afterLeg = (await this.mongo.legModel.find({
      aircraftId: lastLeg.aircraftId,
      startDate: { $gte: lastLeg.endDate }
    }, null, {
      limit: 1,
      sort: { endDate: 1 }
    }))[0];
    // console.log("🚀 ~ FlightService ~ validateData ~ afterLeg", afterLeg)

    if (beforeLeg && (beforeLeg.destinationId._id != firstLeg.departureId))
      throw Error(`first leg departureId cannot be ${firstLeg.departureId}`);

    if (afterLeg && (afterLeg.departureId._id != lastLeg.destinationId))
      throw Error(`last leg destinationId cannot be ${lastLeg.destinationId}`);
  }

  async validateFk(model: any, id: string) {
    const docExists = await model.exists({ _id: id });
    if (!docExists)
      throw Error(`id "${id}" does not exist in DB.`);
  }

  async createTrip({ data }: CreateTripInput) {
    const { legs } = data;

    await this.validateData(legs);
    for (const leg of legs) {
      await this.validateFk(this.mongo.aircraftModel, leg.aircraftId);
      await this.validateFk(this.mongo.locationModel, leg.departureId);
      await this.validateFk(this.mongo.locationModel, leg.destinationId);
    }

    const createdTrip = await this.mongo.tripModel.create({});

    for (let leg of legs) {
      const { aircraftId, departureId, destinationId, endDate, startDate } = leg;
      await this.mongo.legModel.create({
        tripId: createdTrip.id,
        aircraftId,
        startDate,
        endDate,
        departureId,
        destinationId
      });
    }

    const result = (await this.readTrip({ where: { id: createdTrip.id } })).data[0];

    return result;
  }

  async readTrip(input: ReadTripInput): Promise<ReadTripOutput> {
    const { where } = input;

    let foundedTrip = await this.mongo.tripModel.findById(where.id);

    if (!foundedTrip) return { count: 0, data: [] };

    let legs = await this.mongo.legModel.find({
      tripId: where.id
    }).populate(["departureId", "destinationId", "aircraftId"]);

    const result: TripModel = {
      _id: foundedTrip.id,
      tripNo: foundedTrip.tripNo,
      legs: legs.map((leg) => ({
        _id: leg.id,
        aircraft: {
          _id: leg.aircraftId._id,
          name: leg.aircraftId.name
        },
        departure: {
          _id: leg.departureId._id,
          name: leg.departureId.name
        },
        destination: {
          _id: leg.destinationId._id,
          name: leg.destinationId.name
        },
        endDate: leg.endDate,
        startDate: leg.startDate
      }))
    }
    return { count: 1, data: [result] };
  }

  async updateTrip({ data, id }: UpdateTripInput) {
    const { legs } = data;

    await this.validateData(legs);
    for (const leg of legs) {
      await this.validateFk(this.mongo.aircraftModel, leg.aircraftId);
      await this.validateFk(this.mongo.locationModel, leg.departureId);
      await this.validateFk(this.mongo.locationModel, leg.destinationId);
    }

    await this.mongo.legModel.deleteMany({ tripId: id });

    const createdLegs = await this.mongo.legModel.create(
      legs.map(async (leg) => {
        let res: any = {
          tripId: id,
          aircraftId: leg.aircraftId,
          startDate: leg.startDate,
          endDate: leg.endDate,
          departureId: leg.departureId,
          destinationId: leg.destinationId
        }
        if (leg.id)
          res._id = leg.id;
        return res;
      }));

    const result = (await this.readTrip({ where: { id } })).data[0];

    return result;
  }

  async deleteTrip({ id }: DeleteTripInput) {
    const result = await this.mongo.tripModel.findByIdAndDelete(id);

    await this.mongo.legModel.deleteMany({ tripId: id });

    return result;
  }
}
