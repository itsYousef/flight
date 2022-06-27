import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type LocationDocument = Location & Document;

@Schema({ strict: false })
export class Location {
  _id: string;

  @Prop()
  name: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);