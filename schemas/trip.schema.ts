import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

@Schema({ strict: false })
export class Trip {
  @Prop()
  tripNo: string;
}

export const TripSchema = SchemaFactory.createForClass(Trip);