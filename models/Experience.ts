import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  duration?: string;
  price?: number;
  images: { url: string; alt: string }[];
  category: 'wellness' | 'adventure' | 'culture' | 'family';
  isActive: boolean;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String },
    price: { type: Number },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    category: {
      type: String,
      enum: ['wellness', 'adventure', 'culture', 'family'],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

ExperienceSchema.index({ slug: 1 });
ExperienceSchema.index({ category: 1 });

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
