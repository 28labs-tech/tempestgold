import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Property extends Document {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) location: string;
  @Prop() price: number;
  @Prop() price_monthly: number;
  @Prop() city: string;
  @Prop({ default: "For Sale" }) purpose: string;
  @Prop() status: string;
  @Prop({ default: false }) featured: boolean;
  @Prop({ type: [String], default: [] }) uses: string[];
  @Prop() size: number;
  @Prop() landArea: number;
  @Prop() buildingArea: number;
  @Prop() lettableArea: number;
  @Prop() tenure: string;
  @Prop() intendedUse: string;
  @Prop() parking: string;
  @Prop() access: string;
  @Prop() zoning: string;
  @Prop() investment: string;
  @Prop() bathrooms: number;
  @Prop({ default: 0 }) rating: number;
  @Prop({ default: 0 }) reviews: number;
  @Prop({ default: 1 }) guests: number;
  @Prop() bedrooms: number;
  @Prop({ default: 1 }) beds: number;
  @Prop({ default: 1 }) baths: number;
  @Prop({ default: "Other" }) type: string;
  @Prop({ type: [String], default: [] }) images: string[];
  @Prop({
    type: { name: String, image: String, joined: String },
    default: { name: "", image: "", joined: "" },
  })
  host: { name: string; image: string; joined: string };
  @Prop() description: string;
  @Prop({ type: [String], default: [] }) amenities: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
