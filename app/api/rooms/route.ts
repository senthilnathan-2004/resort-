import { NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import Room from '@/models/Room';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const available = searchParams.get('available');
    
    let query = {};
    if (available === 'true') {
      query = { isAvailable: true };
    }

    const rooms = await Room.find(query).sort({ pricePerNight: 1 });
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Basic validation could be added here using Zod

    const newRoom = await Room.create(body);

    return NextResponse.json(
      { message: 'Room created successfully', room: newRoom },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Room with this slug already exists' }, { status: 409 });
    }
    console.error('Room creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
