import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TickerData extends Document {
  @Prop({ required: true }) text: string;
}

export const TickerDataSchema = SchemaFactory.createForClass(TickerData);
