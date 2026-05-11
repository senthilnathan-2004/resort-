import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import Newsletter from '@/models/Newsletter';
import { z } from 'zod';
import { sendEmail } from '@/lib/utils/email';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validatedData = newsletterSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = validatedData.data;

    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email is already subscribed' },
        { status: 409 }
      );
    }

    await Newsletter.create({ email });

    // Send Welcome Email
    await sendEmail({
      to: email,
      subject: 'Welcome to Luxury Resort Updates',
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h2>Welcome to Our Exclusive Newsletter</h2>
          <p>Thank you for subscribing. You'll now receive our latest updates, exclusive offers, and news.</p>
        </div>
      `
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
