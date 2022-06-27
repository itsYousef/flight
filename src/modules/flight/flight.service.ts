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

  validateData(legs: LegData[]) {
    let prevEndDate = null;
    let prevDestination = null;

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
  }

  async validateFk(model: any, id: string) {
    const docExists = await model.exists({ _id: id });
    return docExists ? true : false;
  }

  async createTrip({ data }: CreateTripInput) {
    const { legs } = data;

    const createdTrip = await this.mongo.tripModel.create({});

    this.validateData(legs);

    for (let leg of legs) {
      const { aircraftId, departureId, destinationId, endDate, startDate } = leg;

      await this.validateFk(this.mongo.aircraftModel, aircraftId);
      await this.validateFk(this.mongo.locationModel, departureId);
      await this.validateFk(this.mongo.locationModel, destinationId);

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

    // todo: validate id first
    let foundedTrip = await this.mongo.tripModel.findById(where.id);

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

    await this.mongo.legModel.deleteMany({ tripId: id });

    this.validateData(legs);

    const createdLegs = await this.mongo.legModel.create(
      legs.map((leg) => {
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
