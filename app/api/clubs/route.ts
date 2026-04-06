import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Club from '@/schema/ClubSchema';

export async function GET() {
  try {
    await connectDB();
    const clubs = await Club.find({ isActive: true })
      .sort({ order: 1, name: 1 })
      .select('name slug description color order');

    return NextResponse.json({ success: true, data: clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch clubs' }, { status: 500 });
  }
}
