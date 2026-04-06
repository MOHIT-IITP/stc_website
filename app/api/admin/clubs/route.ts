import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Club from '@/schema/ClubSchema';

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'clubs.read')) {
      return NextResponse.json(permissionDeniedResponse('clubs.read'), { status: 403 });
    }

    await connectDB();
    const clubs = await Club.find().sort({ order: 1, name: 1 });
    return NextResponse.json({ success: true, data: clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch clubs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'clubs.create')) {
      return NextResponse.json(permissionDeniedResponse('clubs.create'), { status: 403 });
    }

    await connectDB();
    const body = await request.json();
    
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, error: 'Name and slug are required' }, { status: 400 });
    }

    // Check if slug already exists
    const existingClub = await Club.findOne({ slug: body.slug.toLowerCase() });
    if (existingClub) {
      return NextResponse.json({ success: false, error: 'A club with this slug already exists' }, { status: 400 });
    }
    
    const club = await Club.create({
      ...body,
      slug: body.slug.toLowerCase(),
      createdBy: session.user.email
    });

    return NextResponse.json({ success: true, data: club }, { status: 201 });
  } catch (error) {
    console.error('Error creating club:', error);
    return NextResponse.json({ success: false, error: 'Failed to create club' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'clubs.update')) {
      return NextResponse.json(permissionDeniedResponse('clubs.update'), { status: 403 });
    }

    await connectDB();
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Club ID is required' }, { status: 400 });
    }

    if (updateData.slug) {
      updateData.slug = updateData.slug.toLowerCase();
      // Check if slug already exists for different club
      const existingClub = await Club.findOne({ slug: updateData.slug, _id: { $ne: id } });
      if (existingClub) {
        return NextResponse.json({ success: false, error: 'A club with this slug already exists' }, { status: 400 });
      }
    }

    const club = await Club.findByIdAndUpdate(id, updateData, { new: true });

    if (!club) {
      return NextResponse.json({ success: false, error: 'Club not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: club });
  } catch (error) {
    console.error('Error updating club:', error);
    return NextResponse.json({ success: false, error: 'Failed to update club' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'clubs.delete')) {
      return NextResponse.json(permissionDeniedResponse('clubs.delete'), { status: 403 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Club ID is required' }, { status: 400 });
    }

    const club = await Club.findByIdAndDelete(id);

    if (!club) {
      return NextResponse.json({ success: false, error: 'Club not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Club deleted successfully' });
  } catch (error) {
    console.error('Error deleting club:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete club' }, { status: 500 });
  }
}
