import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Resources from '@/schema/ResourcesSchema';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.read')) {
      return NextResponse.json(permissionDeniedResponse('resources.read'), { status: 403 });
    }

    await connectDB();

    const { id } = await params;
    const resource = await Resources.findOne({ _id: id, isActive: true });
    
    if (!resource) {
      return NextResponse.json({
        success: false,
        error: 'Resource not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch resource'
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.update')) {
      return NextResponse.json(permissionDeniedResponse('resources.update'), { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { title, description, type, fileUrl, fileName, fileSize, fileType, category, tags, order, isActive } = body;

    const resource = await Resources.findOneAndUpdate(
      { _id: id },
      { title, description, type, fileUrl, fileName, fileSize, fileType, category, tags, order, isActive },
      { new: true, runValidators: true }
    );

    if (!resource) {
      return NextResponse.json({
        success: false,
        error: 'Resource not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error updating resource:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update resource'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'resources.delete')) {
      return NextResponse.json(permissionDeniedResponse('resources.delete'), { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const resource = await Resources.findOneAndDelete({ _id: id });

    if (!resource) {
      return NextResponse.json({
        success: false,
        error: 'Resource not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Resource permanently deleted'
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete resource'
    }, { status: 500 });
  }
}
