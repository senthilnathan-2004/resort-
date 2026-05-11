import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  guests: z.number().int().min(1, 'At least 1 guest is required'),
  checkIn: z.string().transform((str) => new Date(str)),
  checkOut: z.string().transform((str) => new Date(str)),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
