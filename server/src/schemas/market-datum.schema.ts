import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MarketDatum extends Document {
  @Prop({ required: true }) city: string;
  @Prop() price: string;
  @Prop() change: string;
  @Prop() volume: string;
  @Prop() trend: string;
}

export const MarketDatumSchema = SchemaFactory.createForClass(MarketDatum);
