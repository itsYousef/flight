import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type RegionDocument = Region & Document;

@Schema({ strict: false })
export class Region {
  @Prop()
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);