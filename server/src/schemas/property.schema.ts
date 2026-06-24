import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) location: string;
  @Prop({ required: true }) price: number;
  @Prop({ default: 0 }) rating: number;
  @Prop({ default: 0 }) reviews: number;
  @Prop({ default: 1 }) guests: number;
  @Prop({ default: 1 }) bedrooms: number;
  @Prop({ default: 1 }) beds: number;
  @Prop({ default: 1 }) baths: number;
  @Prop({ default: 'Villas' }) type: string;
  @Prop({ type: [String], default: [] }) images: string[];
  @Prop({
    type: { name: String, image: String, joined: String },
    default: { name: '', image: '', joined: '' },
  })
  host: { name: string; image: string; joined: string };
  @Prop() description: string;
  @Prop({ type: [String], default: [] }) amenities: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
