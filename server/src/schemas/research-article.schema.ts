import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ResearchArticle extends Document {
  @Prop({ required: true }) title: string;
  @Prop() excerpt: string;
  @Prop() category: string;
  @Prop() author: string;
  @Prop() date: string;
  @Prop() readTime: string;
  @Prop() image: string;
  @Prop() content: string;
}

export const ResearchArticleSchema = SchemaFactory.createForClass(ResearchArticle);
