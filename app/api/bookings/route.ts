import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import Booking from '@/models/Booking';
import Room from '@/models/Room';
import { bookingSchema } from '@/lib/validators/booking.schema';
import { sendEmail } from '@/lib/utils/email';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const validatedData = bookingSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.issues },
        { status: 400 }
      );
    }

    const data = validatedData.data;

    // Verify room exists and is available
    const room = await Room.findById(data.roomId);
    if (!room || !room.isAvailable) {
      return NextResponse.json({ error: 'Room is not available' }, { status: 400 });
    }

    // Check for date conflicts (simplified logic, in reality we'd query overlapping dates)
    const existingBooking = await Booking.findOne({
      roomId: data.roomId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { checkIn: { $lt: data.checkOut, $gte: data.checkIn } },
        { checkOut: { $gt: data.checkIn, $lte: data.checkOut } }
      ]
    });

    if (existingBooking) {
      return NextResponse.json({ error: 'Room is already booked for these dates' }, { status: 409 });
    }

    // Generate Reservation ID (e.g., RES-XXXXXX)
    const reservationId = `RES-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Calculate nights & price
    const msPerDay = 1000 * 60 * 60 * 24;
    const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / msPerDay);
    const totalPrice = nights * room.pricePerNight;

    const newBooking = await Booking.create({
      ...data,
      reservationId,
      totalPrice,
      status: 'pending'
    });

    // Send Emails
    await sendEmail({
      to: data.email,
      subject: `Booking Request Received - ${reservationId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Booking Request Received</h2>
          <p>Dear ${data.firstName},</p>
          <p>We have received your booking request for <strong>${room.name}</strong>.</p>
          <p>Your reservation ID is: <strong>${reservationId}</strong></p>
          <p>Our team will review your request and send a confirmation shortly.</p>
          <hr/>
          <p><strong>Stay Details:</strong></p>
          <ul>
            <li>Check-in: ${data.checkIn.toLocaleDateString()}</li>
            <li>Check-out: ${data.checkOut.toLocaleDateString()}</li>
            <li>Total Price: $${totalPrice}</li>
          </ul>
        </div>
      `,
    });

    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@resort.com',
      subject: `New Booking Request - ${reservationId}`,
      html: `<p>New booking request for room ${room.name} by ${data.firstName} ${data.lastName}. Total: $${totalPrice}</p>`
    });

    return NextResponse.json(
      { message: 'Booking request submitted successfully', reservationId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    // Requires admin auth middleware in a real app
    const bookings = await Booking.find().populate('roomId', 'name').sort({ createdAt: -1 });
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
