import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Club from '@/schema/ClubSchema';
import Member from '@/schema/MemberSchema';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const wingId = searchParams.get('wingId');
    
    let clubs;
    if (wingId) {
      clubs = await Club.find({ wingId: wingId.toLowerCase(), isActive: true }).sort({ order: 1 });
    } else {
      clubs = await Club.find({ isActive: true }).sort({ order: 1 });
    }

    // Add member counts to each club
    const clubsWithCounts = await Promise.all(
      clubs.map(async (club) => {
        const memberCount = await Member.countDocuments({ clubId: club.id, isActive: true });
        const clubObj = club.toObject();
        return {
          ...clubObj,
          memberCount
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: clubsWithCounts
    });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch clubs'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();
    const { id, wingId, title, branch, description, message, whatsappLink, cardUrl, order } = body;

    // Validation
    if (!id || !wingId || !title || !branch || !description || !message || !whatsappLink || !cardUrl) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: id, wingId, title, branch, description, message, whatsappLink, cardUrl'
      }, { status: 400 });
    }

    // Check if club already exists
    const existingClub = await Club.findOne({ id: id.toLowerCase() });
    if (existingClub) {
      return NextResponse.json({
        success: false,
        error: 'Club with this ID already exists'
      }, { status: 400 });
    }

    const club = new Club({
      id: id.toLowerCase(),
      wingId: wingId.toLowerCase(),
      title,
      branch,
      description,
      message,
      whatsappLink,
      cardUrl,
      order: order || 0
    });

    await club.save();

    return NextResponse.json({
      success: true,
      data: club
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating club:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create club'
    }, { status: 500 });
  }
}
