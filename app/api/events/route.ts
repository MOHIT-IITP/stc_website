import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Events from '@/schema/EventsSchema';

export async function GET() {
  try {
    await connectDB();
    const events = await Events.find().sort({ createdAt: -1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 });
  }
}