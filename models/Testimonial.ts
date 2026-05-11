import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  rating: number; // 1-5
  content: string;
  avatar?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    content: { type: String, required: true },
    avatar: { type: String },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

TestimonialSchema.index({ isApproved: 1 });

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
