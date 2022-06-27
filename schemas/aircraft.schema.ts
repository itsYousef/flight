import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export type AircraftDocument = Aircraft & mongoose.Document;

@Schema({ strict: false })
export class Aircraft {
  _id: string;

  @Prop()
  name: string;
}

export const AircraftSchema = SchemaFactory.createForClass(Aircraft);