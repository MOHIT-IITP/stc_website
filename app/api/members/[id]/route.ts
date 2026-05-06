import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Member from '@/schema/MemberSchema';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'members.read')) {
      return NextResponse.json(permissionDeniedResponse('members.read'), { status: 403 });
    }

    await connectDB();

    const { id } = await params;
    const member = await Member.findOne({ _id: id, isActive: true });
    
    if (!member) {
      return NextResponse.json({
        success: false,
        error: 'Member not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch member'
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

    if (!checkPermission(session, 'members.update')) {
      return NextResponse.json(permissionDeniedResponse('members.update'), { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { name, position, email, linkedin, github, imgUrl, order, isActive } = body;

    const member = await Member.findOneAndUpdate(
      { _id: id },
      { name, position, email, linkedin, github, imgUrl, order, isActive },
      { new: true, runValidators: true }
    );

    if (!member) {
      return NextResponse.json({
        success: false,
        error: 'Member not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update member'
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

    if (!checkPermission(session, 'members.delete')) {
      return NextResponse.json(permissionDeniedResponse('members.delete'), { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const member = await Member.findOneAndUpdate(
      { _id: id },
      { isActive: false },
      { new: true }
    );

    if (!member) {
      return NextResponse.json({
        success: false,
        error: 'Member not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Member deactivated successfully'
    });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete member'
    }, { status: 500 });
  }
}
