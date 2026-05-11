import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import RegistrationTemplate from '@/schema/RegistrationTemplateSchema';

type PaymentPayload = {
  paymentMode?: unknown;
  registrationFee?: unknown;
  registrationFeeScope?: unknown;
};

function normalizePaymentFields(payload: PaymentPayload) {
  const paymentMode = Boolean(payload.paymentMode);
  const registrationFee = Number(payload.registrationFee);
  const registrationFeeScope =
    payload.registrationFeeScope === 'per-team' ||
    payload.registrationFeeScope === 'per-person'
      ? payload.registrationFeeScope
      : undefined;

  if (paymentMode && (!Number.isFinite(registrationFee) || registrationFee <= 0)) {
    return 'Registration fee is required when payment is enabled';
  }

  if (paymentMode && !registrationFeeScope) {
    return 'Registration fee scope is required when payment is enabled';
  }

  payload.paymentMode = paymentMode;
  payload.registrationFee = paymentMode ? registrationFee : 0;
  payload.registrationFeeScope = paymentMode ? registrationFeeScope : undefined;

  return null;
}

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
    const id = searchParams.get('id');
    
    if (id) {
      const template = await RegistrationTemplate.findById(id);
      if (!template) {
        return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
      }
      return NextResponse.json(template);
    }
    
    const templates = await RegistrationTemplate.find().sort({ createdAt: -1 });
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as UserSession | null;
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (!checkPermission(session, 'registrations.create')) {
      return NextResponse.json(permissionDeniedResponse('registrations.create'), { status: 403 });
    }

    await connectDB();
    const body = await request.json();
    const paymentError = normalizePaymentFields(body);

    if (paymentError) {
      return NextResponse.json({ success: false, error: paymentError }, { status: 400 });
    }
    
    const mandatoryFields = ['name', 'email', 'phone', 'semester'];
    const fieldKeys = body.fields?.map((f: { key: string }) => f.key) || [];
    const missingFields = mandatoryFields.filter(field => !fieldKeys.includes(field));
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        success: false,
        error: `Missing mandatory fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    const existingTemplate = await RegistrationTemplate.findOne({ slug: body.slug });
    if (existingTemplate) {
      return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
    }

    const template = await RegistrationTemplate.create(body);
    return NextResponse.json(template, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ success: false, error: 'Failed to create template' }, { status: 500 });
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
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Template ID required' }, { status: 400 });
    }

    if ('paymentMode' in updateData || 'registrationFee' in updateData || 'registrationFeeScope' in updateData) {
      const paymentError = normalizePaymentFields(updateData);

      if (paymentError) {
        return NextResponse.json({ success: false, error: paymentError }, { status: 400 });
      }
    }

    if (updateData.fields) {
      const mandatoryFields = ['name', 'email', 'phone', 'semester'];
      const fieldKeys = updateData.fields.map((f: { key: string }) => f.key);
      const missingFields = mandatoryFields.filter(field => !fieldKeys.includes(field));
      
      if (missingFields.length > 0) {
        return NextResponse.json({ 
          success: false,
          error: `Missing mandatory fields: ${missingFields.join(', ')}` 
        }, { status: 400 });
      }
    }

    if (updateData.slug) {
      const existingTemplate = await RegistrationTemplate.findOne({ 
        slug: updateData.slug, 
        _id: { $ne: id } 
      });
      if (existingTemplate) {
        return NextResponse.json({ success: false, error: 'Slug already exists' }, { status: 400 });
      }
    }

    const template = await RegistrationTemplate.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true }
    );

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json({ success: false, error: 'Failed to update template' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Template ID required' }, { status: 400 });
    }

    const template = await RegistrationTemplate.findByIdAndDelete(id);

    if (!template) {
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete template' }, { status: 500 });
  }
}
