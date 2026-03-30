import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import CompetitionResult from '@/schema/CompetitionResultSchema';

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'competitions.read')) {
      return NextResponse.json(permissionDeniedResponse('competitions.read'), { status: 403 });
    }

    await connectDB();
    const results = await CompetitionResult.find().sort({ createdAt: -1, rank: 1 });
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching competition results:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch competition results' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'competitions.create')) {
      return NextResponse.json(permissionDeniedResponse('competitions.create'), { status: 403 });
    }

    await connectDB();
    const body = await request.json();
    
    const result = await CompetitionResult.create(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating competition result:', error);
    return NextResponse.json({ success: false, error: 'Failed to create competition result' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'competitions.update')) {
      return NextResponse.json(permissionDeniedResponse('competitions.update'), { status: 403 });
    }

    await connectDB();
    const { id, ...updateData } = await request.json();

    const result = await CompetitionResult.findByIdAndUpdate(id, updateData, { new: true });

    if (!result) {
      return NextResponse.json({ success: false, error: 'Competition result not found' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating competition result:', error);
    return NextResponse.json({ success: false, error: 'Failed to update competition result' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'competitions.delete')) {
      return NextResponse.json(permissionDeniedResponse('competitions.delete'), { status: 403 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Result ID required' }, { status: 400 });
    }

    const result = await CompetitionResult.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ success: false, error: 'Competition result not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting competition result:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete competition result' }, { status: 500 });
  }
}
