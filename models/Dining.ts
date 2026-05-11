import mongoose, { Schema, Document } from 'mongoose';

export interface IDining extends Document {
  name: string;
  slug: string;
  type: 'restaurant' | 'bar' | 'cafe' | 'in-room';
  description: string;
  openingHours: string;
  menuUrl?: string;
  images: { url: string; alt: string }[];
  isFeatured: boolean;
  isActive: boolean;
}

const DiningSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    type: {
      type: String,
      enum: ['restaurant', 'bar', 'cafe', 'in-room'],
      required: true,
    },
    description: { type: String, required: true },
    openingHours: { type: String, required: true },
    menuUrl: { type: String },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

DiningSchema.index({ slug: 1 });
DiningSchema.index({ isActive: 1 });

export default mongoose.models.Dining || mongoose.model<IDining>('Dining', DiningSchema);
