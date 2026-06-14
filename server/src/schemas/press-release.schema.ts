import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PressRelease extends Document {
  @Prop() date: string;
  @Prop({ required: true }) headline: string;
  @Prop() excerpt: string;
  @Prop() publication: string;
}

export const PressReleaseSchema = SchemaFactory.createForClass(PressRelease);
