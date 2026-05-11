import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  slug: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  image: string;
  termsAndConditions: string;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    discountValue: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    image: { type: String, required: true },
    termsAndConditions: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

OfferSchema.index({ slug: 1 });
OfferSchema.index({ validFrom: 1, validUntil: 1 });
OfferSchema.index({ isActive: 1 });

export default mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema);
