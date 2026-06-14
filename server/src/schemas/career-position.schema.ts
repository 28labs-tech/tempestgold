import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CareerPosition extends Document {
  @Prop({ required: true }) title: string;
  @Prop() department: string;
  @Prop() location: string;
  @Prop() type: string;
  @Prop() description: string;
}

export const CareerPositionSchema = SchemaFactory.createForClass(CareerPosition);
