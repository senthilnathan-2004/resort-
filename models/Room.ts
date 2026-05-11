import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  capacity: number;
  size: number;
  beds: string;
  amenities: string[];
  images: { url: string; alt: string }[];
  featuredImage: string;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    size: { type: Number, required: true }, // in sq meters or sq ft
    beds: { type: String, required: true },
    amenities: [{ type: String }],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    featuredImage: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

RoomSchema.index({ slug: 1 });
RoomSchema.index({ isAvailable: 1 });

export default mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);
