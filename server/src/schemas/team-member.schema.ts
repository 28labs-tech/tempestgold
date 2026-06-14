import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TeamMember extends Document {
  @Prop({ required: true }) name: string;
  @Prop() title: string;
  @Prop() bio: string;
  @Prop() image: string;
  @Prop({
    type: { linkedin: String, twitter: String },
    default: { linkedin: '#', twitter: '#' },
  })
  social: { linkedin: string; twitter: string };
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
