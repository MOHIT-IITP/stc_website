import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Member from '@/schema/MemberSchema';
import Club from '@/schema/ClubSchema';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    
    // Check if club exists
    const club = await Club.findOne({ id: id.toLowerCase(), isActive: true });
    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 404 });
    }

    // Get members for this club
    const members = await Member.find({ clubId: id.toLowerCase(), isActive: true }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Error fetching club members:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch club members'
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, position, email, linkedin, github, imgUrl, order } = body;

    // Check if club exists
    const club = await Club.findOne({ id: id.toLowerCase(), isActive: true });
    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 404 });
    }

    // Validation
    if (!name || !position || !email || !imgUrl) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, position, email, imgUrl'
      }, { status: 400 });
    }

    const member = new Member({
      clubId: id.toLowerCase(),
      name,
      position,
      email: email.toLowerCase(),
      linkedin,
      github,
      imgUrl,
      order: order || 0
    });

    await member.save();

    return NextResponse.json({
      success: true,
      data: member
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create member'
    }, { status: 500 });
  }
}
