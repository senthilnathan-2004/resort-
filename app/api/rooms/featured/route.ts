import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import Room from '@/models/Room';

export async function GET() {
  try {
    await dbConnect();
    const rooms = await Room.find({ isFeatured: true }).limit(3);
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
