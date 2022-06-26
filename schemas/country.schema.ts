import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as mongoose from 'mongoose';
import { Region } from './region.schema';


export type CountryDocument = Country & Document;

@Schema({ strict: false })
export class Country {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  regionId: Region;
}

export const CountrySchema = SchemaFactory.createForClass(Country);