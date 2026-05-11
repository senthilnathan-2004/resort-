import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomId: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  specialRequests?: string;
  paymentPreference: 'credit_card' | 'bank_transfer' | 'pay_at_hotel';
  status: 'pending' | 'confirmed' | 'cancelled';
  reservationId: string;
  totalPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    specialRequests: { type: String, trim: true },
    paymentPreference: {
      type: String,
      enum: ['credit_card', 'bank_transfer', 'pay_at_hotel'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    reservationId: { type: String, required: true, unique: true },
    totalPrice: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster querying
BookingSchema.index({ reservationId: 1 });
BookingSchema.index({ email: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ checkIn: 1, checkOut: 1 });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
