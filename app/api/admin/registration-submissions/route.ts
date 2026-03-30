import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import RegistrationSubmission from '@/schema/RegistrationSubmissionSchema';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'registrations.read')) {
      return NextResponse.json(permissionDeniedResponse('registrations.read'), { status: 403 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const registrationSlug = searchParams.get('registrationSlug');
    const status = searchParams.get('status');

    const query: Record<string, unknown> = {};
    if (registrationSlug) query.registrationSlug = registrationSlug;
    if (status) query.status = status;

    const submissions = await RegistrationSubmission.find(query)
      .sort({ submittedAt: -1 })
      .populate('registrationTemplateId', 'name slug');

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'registrations.update')) {
      return NextResponse.json(permissionDeniedResponse('registrations.update'), { status: 403 });
    }

    await connectDB();
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Submission ID and status are required' }, { status: 400 });
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const submission = await RegistrationSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!submission) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to update submission' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'registrations.delete')) {
      return NextResponse.json(permissionDeniedResponse('registrations.delete'), { status: 403 });
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Submission ID required' }, { status: 400 });
    }

    const submission = await RegistrationSubmission.findByIdAndDelete(id);

    if (!submission) {
      return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete submission' }, { status: 500 });
  }
}
