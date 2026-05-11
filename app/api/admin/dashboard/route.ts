import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import dbConnect from '@/lib/database/mongodb';
import Booking from '@/models/Booking';
import Inquiry from '@/models/Inquiry';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const [totalBookings, totalInquiries, recentBookings] = await Promise.all([
      Booking.countDocuments(),
      Inquiry.countDocuments(),
      Booking.find().sort({ createdAt: -1 }).limit(5).populate('roomId')
    ]);

    // Calculate revenue (simplified)
    const revenueResult = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    return NextResponse.json({
      stats: {
        totalBookings,
        totalInquiries,
        totalRevenue
      },
      recentBookings
    });
  } catch (error: any) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
