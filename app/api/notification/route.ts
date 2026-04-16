import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Notifications from '@/schema/NotificationsSchema';

export async function GET() {
  try {
    await connectDB();
    const notifications = await Notifications.find().sort({ createdAt: -1 });
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch notifications' }, { status: 500 });
  }
}