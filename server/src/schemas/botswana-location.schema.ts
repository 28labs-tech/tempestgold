import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class BotswanaLocation extends Document {
  @Prop({ required: true }) name: string;
  @Prop() description: string;
  @Prop() image: string;
}

export const BotswanaLocationSchema = SchemaFactory.createForClass(BotswanaLocation);
