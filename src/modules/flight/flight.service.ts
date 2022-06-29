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

  // validating trip legs
  async validateData(legs: LegData[]) {
    for (let i = 0; i < legs.length; i++) {
      // console.log(`---------------------validating leg[${i}]---------------------------`)
      const prevLeg: LegData = legs[i - 1];
      const nextLeg: LegData = legs[i + 1];

      if (legs[i].endDate <= legs[i].startDate)
        throw Error("endDate must be larger than startDate.");

      if (prevLeg && (legs[i].startDate <= prevLeg.endDate))
        throw Error("startDate must be larger than previous endDate.");

      if (legs[i].departureId == legs[i].destinationId)
        throw Error("departure and destination cannot be same.");

      // validate legs across trips
      let beforeLeg: any = (await this.mongo.legModel.find({
        aircraftId: legs[i].aircraftId,
        endDate: { $lte: legs[i].startDate }
      }, null, {
        limit: 1,
        sort: { endDate: -1 }
      }))[0];

      if (prevLeg && (new Date(prevLeg.endDate) > beforeLeg.endDate))
        beforeLeg = prevLeg;
      // console.log("🚀 ~ FlightService ~ validateData ~ beforeLeg", beforeLeg)

      let afterLeg: any = (await this.mongo.legModel.find({
        aircraftId: legs[i].aircraftId,
        startDate: { $gte: legs[i].endDate }
      }, null, {
        limit: 1,
        sort: { endDate: 1 }
      }))[0];

      // console.log(`${new Date(nextLeg.startDate)} < ${afterLeg.startDate} => ${new Date(nextLeg.startDate) < afterLeg.startDate}`)
      if (nextLeg && (new Date(nextLeg.startDate) < afterLeg.startDate))
        afterLeg = nextLeg;
      // console.log("🚀 ~ FlightService ~ validateData ~ afterLeg", afterLeg)

      // console.log("before check:", beforeLeg && beforeLeg.destinationId, legs[i].departureId)
      if (beforeLeg && (beforeLeg.destinationId != legs[i].departureId))
        throw Error(`leg departureId cannot be ${legs[i].departureId}`);

      // console.log("after check:", afterLeg && afterLeg.departureId, legs[i].destinationId)
      if (afterLeg && (afterLeg.departureId != legs[i].destinationId))
        throw Error(`leg destinationId cannot be ${legs[i].destinationId}`);
    }
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
