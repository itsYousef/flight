import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Leg } from './leg.schema';


export type AircraftDocument = Aircraft & mongoose.Document;

@Schema({ strict: false })
export class Aircraft {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Leg' })
  legId: Leg;
}

export const AircraftSchema = SchemaFactory.createForClass(Aircraft);