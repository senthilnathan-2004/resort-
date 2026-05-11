import { z } from 'zod';

export const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  roomId: z.string().length(24, 'Invalid Room ID'),
  checkIn: z.string().transform((str) => new Date(str)),
  checkOut: z.string().transform((str) => new Date(str)),
  guests: z.number().int().min(1, 'At least 1 guest is required'),
  specialRequests: z.string().optional(),
  paymentPreference: z.enum(['credit_card', 'bank_transfer', 'pay_at_hotel']),
}).refine((data) => data.checkIn < data.checkOut, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"]
});

export type BookingInput = z.infer<typeof bookingSchema>;
