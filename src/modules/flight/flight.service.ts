import { Injectable } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';
import { CreateTripInput } from './dto/create-trip.input';
import { ReadTripInput } from './dto/read-trip.input';
import { ReadTripOutput } from './dto/read-trip.output';
import { TripModel } from './model/trip.model';

@Injectable()
export class FlightService {
  constructor(
    private mongo: MongoService
  ) { }

  async createTrip({ data }: CreateTripInput) {
    const { legs } = data;

    const createdTrip = await this.mongo.tripModel.create({});

    //todo: validate legs startDate and endDate (end > start , nextStart > end)
    //todo: validate legs location (dep != des, dep == prev.des)
    for (let leg of legs) {
      const { aircraftId, departureId, destinationId, endDate, startDate } = leg;

      //todo: validate aircraftId, departureId, destinationId
      await this.mongo.legModel.create({
        tripId: createdTrip.id,
        aircraftId,
        startDate,
        endDate,
        departureId,
        destinationId
      });
    }
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

  // async readTripCities(input: ReadTripCitiesInput): Promise<ReadTripCitiesOutput> {
  //   const { where } = input;

  //   const region = await this.mongo.regionModel.findOne({
  //     name: where.name
  //   });

  //   const readCountryInp: ReadCountryInput = {
  //     where: {
  //       regionId: region.id
  //     }
  //   }
  //   const countries: ReadCountryOutput = await lastValueFrom(this.kafkaClient.send('readCountry', { ...readCountryInp }));

  //   const countryIds: string[] = [];
  //   for (let country of countries.data) {
  //     countryIds.push(country._id);
  //   }

  //   const readCityInp: ReadCityInput = {
  //     where: {
  //       countryId: countryIds,
  //       nameSort: where.cityNameSort
  //     }
  //   }
  //   const cities: ReadCityOutput = await lastValueFrom(this.kafkaClient.send('readCity', { ...readCityInp }));

  //   return { count: cities.count, data: cities.data };
  // }

  // async updateTrip({ data, id }: UpdateTripInput) {
  //   const { name } = data;
  //   const input = cleanDeep({
  //     name
  //   })

  //   return this.mongo.regionModel.findByIdAndUpdate(id, input);
  // }

  // async deleteTrip(input: DeleteTripInput) {
  //   return this.mongo.regionModel.findByIdAndDelete(input.id);
  // }
}
