import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Club from '@/schema/ClubSchema';
import Member from '@/schema/MemberSchema';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const club = await Club.findOne({ id: id.toLowerCase(), isActive: true });
    
    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 404 });
    }

    // Get members for this club
    const members = await Member.find({ clubId: club.id, isActive: true }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      data: {
        ...club.toObject(),
        members
      }
    });
  } catch (error) {
    console.error('Error fetching club:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch club'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, branch, description, message, whatsappLink, cardUrl, order, isActive } = body;

    const club = await Club.findOneAndUpdate(
      { id: id.toLowerCase() },
      { title, branch, description, message, whatsappLink, cardUrl, order, isActive },
      { new: true, runValidators: true }
    );

    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: club
    });
  } catch (error) {
    console.error('Error updating club:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update club'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const club = await Club.findOneAndUpdate(
      { id: id.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 404 });
    }

    // Also deactivate all members in this club
    await Member.updateMany(
      { clubId: club.id },
      { isActive: false }
    );

    return NextResponse.json({
      success: true,
      message: 'Club and associated members deactivated successfully'
    });
  } catch (error) {
    console.error('Error deleting club:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete club'
    }, { status: 500 });
  }
}
