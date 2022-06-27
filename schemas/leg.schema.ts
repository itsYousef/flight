import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Aircraft } from './aircraft.schema';
import { Location } from './location.schema';
import { Trip } from './trip.schema';


export type LegDocument = Leg & mongoose.Document;

@Schema({ strict: false })
export class Leg {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  tripId: Trip;

  @Prop()
  startDate: Date;           // start date (extract time for std property)

  @Prop()
  endDate: Date;             // end date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  departureId: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Location' })
  destinationId: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Aircraft' })
  aircraftId: Aircraft;
}

export const LegSchema = SchemaFactory.createForClass(Leg);