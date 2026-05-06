import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Wing from '@/schema/WingSchema';
import Club from '@/schema/ClubSchema';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await params;
    const wing = await Wing.findOne({ id: id.toLowerCase(), isActive: true });
    
    if (!wing) {
      return NextResponse.json({
        success: false,
        error: 'Wing not found'
      }, { status: 404 });
    }

    // Get clubs for this wing
    const clubs = await Club.find({ wingId: wing.id, isActive: true }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      data: {
        ...wing.toObject(),
        clubs
      }
    });
  } catch (error) {
    console.error('Error fetching wing:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch wing'
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
    const { name, description, logoUrl, order, isActive } = body;

    const wing = await Wing.findOneAndUpdate(
      { id: id.toLowerCase() },
      { name, description, logoUrl, order, isActive },
      { new: true, runValidators: true }
    );

    if (!wing) {
      return NextResponse.json({
        success: false,
        error: 'Wing not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: wing
    });
  } catch (error) {
    console.error('Error updating wing:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update wing'
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
    const wing = await Wing.findOneAndUpdate(
      { id: id.toLowerCase() },
      { isActive: false },
      { new: true }
    );

    if (!wing) {
      return NextResponse.json({
        success: false,
        error: 'Wing not found'
      }, { status: 404 });
    }

    // Also deactivate all clubs in this wing
    await Club.updateMany(
      { wingId: wing.id },
      { isActive: false }
    );

    return NextResponse.json({
      success: true,
      message: 'Wing and associated clubs deactivated successfully'
    });
  } catch (error) {
    console.error('Error deleting wing:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete wing'
    }, { status: 500 });
  }
}
