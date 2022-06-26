import { Injectable } from '@nestjs/common';
import { MongoService } from '../mongo/mongo.service';

@Injectable()
export class FlightService {
  constructor(
    private mongo: MongoService
  ) { }

  // async createRegion({ data }: CreateRegionInput) {
  //   const { name } = data;

  //   return this.mongo.regionModel.create({
  //     name
  //   });
  // }

  // async readRegion(input: ReadRegionInput): Promise<ReadRegionOutput> {
  //   const { where } = input;

  //   const whereCond: FilterQuery<RegionDocument> = {
  //     _id: where?.id,
  //     name: {
  //       $regex: where?.name
  //     }
  //   }

  //   let whereCondCleaned = cleanDeep(whereCond);

  //   let options = cleanDeep({
  //     skip: input.pagination?.skip,
  //     limit: input.pagination?.take,
  //     sort: {
  //       [input.sortBy?.field]: input.sortBy?.descending ? -1 : 1
  //     }
  //   })

  //   let count = await this.mongo.regionModel.countDocuments(whereCondCleaned);
  //   let data = await this.mongo.regionModel.find(whereCondCleaned, null, options);

  //   return { count, data };
  // }

  // async readRegionCities(input: ReadRegionCitiesInput): Promise<ReadRegionCitiesOutput> {
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

  // async updateRegion({ data, id }: UpdateRegionInput) {
  //   const { name } = data;
  //   const input = cleanDeep({
  //     name
  //   })

  //   return this.mongo.regionModel.findByIdAndUpdate(id, input);
  // }

  // async deleteRegion(input: DeleteRegionInput) {
  //   return this.mongo.regionModel.findByIdAndDelete(input.id);
  // }
}
