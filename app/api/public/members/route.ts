import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Member from '@/schema/MemberSchema';
import Club from '@/schema/ClubSchema';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const clubId = searchParams.get('clubId');
    
    console.log('API called with clubId:', clubId);
    
    let members;
    if (clubId) {
      // Get members for specific club
      console.log('Searching for members with clubId:', clubId.toLowerCase());
      members = await Member.find({ clubId: clubId.toLowerCase(), isActive: true })
        .sort({ order: 1 });
      console.log('Found members:', members.length);
    } else {
      // Get all active members with club information
      console.log('Getting all active members');
      members = await Member.find({ isActive: true })
        .sort({ clubId: 1, order: 1 });
      console.log('Found all members:', members.length);
    }

    // Also check what clubIds exist in the database
    const allClubIds = await Member.distinct('clubId');
    console.log('Available clubIds in database:', allClubIds);

    return NextResponse.json({
      success: true,
      data: members,
      debug: {
        requestedClubId: clubId,
        availableClubIds: allClubIds,
        memberCount: members.length
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch members'
    }, { status: 500 });
  }
}
