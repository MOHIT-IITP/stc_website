import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Wing from '@/schema/WingSchema';
import Club from '@/schema/ClubSchema';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const wings = await Wing.find({ isActive: true }).sort({ order: 1 });
    
    // Add club counts to each wing
    const wingsWithCounts = await Promise.all(
      wings.map(async (wing) => {
        const clubCount = await Club.countDocuments({ wingId: wing.id, isActive: true });
        const wingObj = wing.toObject();
        return {
          ...wingObj,
          clubCount,
          memberCount: 0 // Will be calculated later if needed
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: wingsWithCounts
    });
  } catch (error) {
    console.error('Error fetching wings:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch wings'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();
    const { id, name, description, logoUrl, order } = body;

    // Validation
    if (!id || !name || !description || !logoUrl) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: id, name, description, logoUrl'
      }, { status: 400 });
    }

    // Check if wing already exists
    const existingWing = await Wing.findOne({ id: id.toLowerCase() });
    if (existingWing) {
      return NextResponse.json({
        success: false,
        error: 'Wing with this ID already exists'
      }, { status: 400 });
    }

    const wing = new Wing({
      id: id.toLowerCase(),
      name,
      description,
      logoUrl,
      order: order || 0
    });

    await wing.save();

    return NextResponse.json({
      success: true,
      data: wing
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating wing:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create wing'
    }, { status: 500 });
  }
}
