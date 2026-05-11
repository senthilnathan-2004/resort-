import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  url: string;
  alt: string;
  category: 'exterior' | 'interior' | 'dining' | 'activities' | 'spa';
  tags: string[];
  publicId: string; // for Cloudinary/ImageKit
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    category: {
      type: String,
      enum: ['exterior', 'interior', 'dining', 'activities', 'spa'],
      required: true,
    },
    tags: [{ type: String }],
    publicId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

GallerySchema.index({ category: 1 });

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
