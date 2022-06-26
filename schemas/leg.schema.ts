import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Location } from './location.schema';
import { Trip } from './trip.schema';


export type LegDocument = Leg & mongoose.Document;

@Schema({ strict: false })
export class Leg {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  tripId: Trip;

  @Prop()
  date: Date;       // start date (extract time for std property)

  @Prop()
  sta: Date;        // end date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  departureId: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  destinationId: Location;
}

export const LegSchema = SchemaFactory.createForClass(Leg);