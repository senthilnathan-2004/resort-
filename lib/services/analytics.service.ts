import dbConnect from '@/lib/database/mongodb';
import Booking from '@/models/Booking';
import Inquiry from '@/models/Inquiry';
import Room from '@/models/Room';

export async function getDashboardAnalytics() {
  await dbConnect();
  
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Parallel promises for performance
  const [
    totalBookings,
    totalInquiries,
    recentBookings,
    revenueThisMonth,
    rooms,
  ] = await Promise.all([
    Booking.countDocuments(),
    Inquiry.countDocuments(),
    Booking.find().sort({ createdAt: -1 }).limit(5).populate('roomId', 'name'),
    Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: 'confirmed',
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]),
    Room.find().select('name isAvailable'),
  ]);

  return {
    overview: {
      totalBookings,
      totalInquiries,
      revenueThisMonth: revenueThisMonth[0]?.total || 0,
      totalRooms: rooms.length,
      availableRooms: rooms.filter((r) => r.isAvailable).length,
    },
    recentBookings,
  };
}
