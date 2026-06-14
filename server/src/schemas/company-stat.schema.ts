import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class CompanyStat extends Document {
  @Prop({ required: true, unique: true }) key: string;
  @Prop({ required: true }) value: string;
}

export const CompanyStatSchema = SchemaFactory.createForClass(CompanyStat);
