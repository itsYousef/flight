import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { set } from 'mongoose';
import { City, CitySchema } from 'schemas/city.schema';
import { Country, CountrySchema } from 'schemas/country.schema';
import { Region, RegionSchema } from 'schemas/region.schema';
import { MongoService } from './mongo.service';

@Module({
  providers: [MongoService],
  imports: [
    MongooseModule.forFeature([
      { name: Region.name, schema: RegionSchema },
      { name: Country.name, schema: CountrySchema },
      { name: City.name, schema: CitySchema },
    ])
  ],
  exports: [MongoService]
})
export class MongoModule {
  constructor() {
    set('returnOriginal', false);
  }
}
