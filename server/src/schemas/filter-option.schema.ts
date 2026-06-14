import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class FilterOption extends Document {
  @Prop({ required: true }) category: string;
  @Prop({ required: true }) name: string;
  @Prop() icon: string;
  @Prop() range: string;
  @Prop({ default: 0 }) order: number;
}

export const FilterOptionSchema = SchemaFactory.createForClass(FilterOption);
