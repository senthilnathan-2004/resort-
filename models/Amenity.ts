import mongoose, { Schema, Document } from 'mongoose';

export interface IAmenity extends Document {
  name: string;
  icon: string;
  description?: string;
  category: 'room' | 'resort' | 'spa' | 'dining';
}

const AmenitySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    icon: { type: String, required: true }, // e.g. 'Wifi', 'Pool' -> Maps to a Lucide icon
    description: { type: String },
    category: {
      type: String,
      enum: ['room', 'resort', 'spa', 'dining'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Amenity || mongoose.model<IAmenity>('Amenity', AmenitySchema);
