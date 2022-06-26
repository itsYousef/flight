import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import { Model } from 'mongoose';
import { City, CityDocument } from 'schemas/city.schema';
import { Country, CountryDocument } from 'schemas/country.schema';
import { Region, RegionDocument } from 'schemas/region.schema';

@Injectable()
export class MongoService {
    constructor(
        @InjectModel(Region.name) private regionM: Model<RegionDocument>,
        @InjectModel(Country.name) private countryM: Model<CountryDocument>,
        @InjectModel(City.name) private cityM: Model<CityDocument>
    ) { }

    get regionModel() {
        return this.regionM;
    }

    get countryModel() {
        return this.countryM;
    }

    get cityModel() {
        return this.cityM;
    }

    async getDb() {
        const client = await MongoClient.connect(process.env.DB_CONNECTION);
        return client.db();
    }
}
