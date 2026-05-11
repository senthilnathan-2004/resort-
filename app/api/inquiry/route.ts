import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import Inquiry from '@/models/Inquiry';
import { inquirySchema } from '@/lib/validators/inquiry.schema';
import { sendEmail } from '@/lib/utils/email';

// Basic rate limiting helper (In production, use Redis/Upstash)
const rateLimit = new Map();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Rate Limiting (Simple memory based - 5 requests per 15 minutes)
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const requestLog = rateLimit.get(ip) || [];
    const requestsInWindow = requestLog.filter((timestamp: number) => now - timestamp < windowMs);
    
    if (requestsInWindow.length >= 5) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
    
    requestLog.push(now);
    rateLimit.set(ip, requestLog);

    await dbConnect();

    const body = await req.json();
    
    // Validate request body
    const validatedData = inquirySchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.issues },
        { status: 400 }
      );
    }

    // Save to Database
    const newInquiry = await Inquiry.create(validatedData.data);

    // Send confirmation email to customer
    await sendEmail({
      to: validatedData.data.email,
      subject: 'We received your inquiry - Luxury Resort',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Thank you for your inquiry, ${validatedData.data.name}!</h2>
          <p>We have successfully received your message and our reservations team will get back to you shortly.</p>
          <p><strong>Inquiry Details:</strong></p>
          <ul>
            <li>Check-in: ${validatedData.data.checkIn.toLocaleDateString()}</li>
            <li>Check-out: ${validatedData.data.checkOut.toLocaleDateString()}</li>
            <li>Guests: ${validatedData.data.guests}</li>
          </ul>
          <br/>
          <p>Warm regards,</p>
          <p>The Luxury Resort Team</p>
        </div>
      `,
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@resort.com', // fallback for dev
      subject: 'New Resort Inquiry',
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Inquiry Received</h2>
          <p><strong>Name:</strong> ${validatedData.data.name}</p>
          <p><strong>Email:</strong> ${validatedData.data.email}</p>
          <p><strong>Phone:</strong> ${validatedData.data.phone}</p>
          <p><strong>Dates:</strong> ${validatedData.data.checkIn.toLocaleDateString()} - ${validatedData.data.checkOut.toLocaleDateString()}</p>
          <p><strong>Guests:</strong> ${validatedData.data.guests}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.data.message}</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', inquiryId: newInquiry._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
