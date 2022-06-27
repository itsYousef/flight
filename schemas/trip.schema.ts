import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type TripDocument = Trip & Document;

function tripNoGenerator() {
  const now = new Date();
  return `${now.toLocaleDateString()}--${uuid()}`;
}
@Schema({ strict: false })
export class Trip {
  _id: string;

  @Prop({ default: tripNoGenerator })
  tripNo: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);