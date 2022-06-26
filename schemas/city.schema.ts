import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as mongoose from 'mongoose';
import { Country } from './country.schema';

export type CityDocument = City & Document;

@Schema({ strict: false })
export class City {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  countryId: Country;
}

export const CitySchema = SchemaFactory.createForClass(City);