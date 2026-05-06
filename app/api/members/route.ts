import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Member from '@/schema/MemberSchema';
import Club from '@/schema/ClubSchema';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'members.read')) {
      return NextResponse.json(permissionDeniedResponse('members.read'), { status: 403 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const clubId = searchParams.get('clubId');
    
    let members;
    if (clubId) {
      members = await Member.find({ clubId: clubId.toLowerCase(), isActive: true }).sort({ order: 1 });
    } else {
      members = await Member.find({ isActive: true }).sort({ order: 1 });
    }

    return NextResponse.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch members'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'members.create')) {
      return NextResponse.json(permissionDeniedResponse('members.create'), { status: 403 });
    }

    await connectDB();
    const body = await request.json();
    const { clubId, name, position, email, linkedin, github, imgUrl, order } = body;

    // Validation
    if (!clubId || !name || !position || !email || !imgUrl) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: clubId, name, position, email, imgUrl'
      }, { status: 400 });
    }

    // Check if club exists
    const club = await Club.findOne({ id: clubId.toLowerCase(), isActive: true });
    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 400 });
    }

    const member = new Member({
      clubId: clubId.toLowerCase(),
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
