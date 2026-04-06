import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Resources from '@/schema/ResourcesSchema';
import Club from '@/schema/ClubSchema';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.read')) {
      return NextResponse.json(permissionDeniedResponse('resources.read'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const clubId = searchParams.get('clubId');
    
    const query = clubId ? { clubId } : {};
    const resources = await Resources.find(query)
      .populate('clubId', 'name slug')
      .sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json({ success: true, data: resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.create')) {
      return NextResponse.json(permissionDeniedResponse('resources.create'), { status: 403 });
    }

    await connectDB();
    const body = await request.json();
    
    if (!body.title || !body.url || !body.clubId) {
      return NextResponse.json({ success: false, error: 'Title, URL and Club are required' }, { status: 400 });
    }

    // Verify club exists
    const club = await Club.findById(body.clubId);
    if (!club) {
      return NextResponse.json({ success: false, error: 'Club not found' }, { status: 404 });
    }
    
    const resource = await Resources.create({
      ...body,
      createdBy: session.user.email
    });

    const populatedResource = await Resources.findById(resource._id).populate('clubId', 'name slug');

    return NextResponse.json({ success: true, data: populatedResource }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ success: false, error: 'Failed to create resource' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.update')) {
      return NextResponse.json(permissionDeniedResponse('resources.update'), { status: 403 });
    }

    await connectDB();
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Resource ID is required' }, { status: 400 });
    }

    // If clubId is being updated, verify club exists
    if (updateData.clubId) {
      const club = await Club.findById(updateData.clubId);
      if (!club) {
        return NextResponse.json({ success: false, error: 'Club not found' }, { status: 404 });
      }
    }

    const resource = await Resources.findByIdAndUpdate(id, updateData, { new: true })
      .populate('clubId', 'name slug');

    if (!resource) {
      return NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: resource });
  } catch (error) {
    console.error('Error updating resource:', error);
    return NextResponse.json({ success: false, error: 'Failed to update resource' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.delete')) {
      return NextResponse.json(permissionDeniedResponse('resources.delete'), { status: 403 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Resource ID is required' }, { status: 400 });
    }

    const resource = await Resources.findByIdAndDelete(id);

    if (!resource) {
      return NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete resource' }, { status: 500 });
  }
}
