import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { checkPermission, permissionDeniedResponse, UserSession } from '@/lib/permissions';
import connectDB from '@/lib/connectdb';
import Certificate from '@/schema/cretificateSchema';

function generateCertificateId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `STC-${part1}-${part2}`;
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions) as UserSession | null;
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!checkPermission(session, 'certificates.read')) {
            return NextResponse.json(permissionDeniedResponse('certificates.read'), { status: 403 });
        }

        await connectDB();
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        return NextResponse.json(certificates);
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch certificates' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as UserSession | null;
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!checkPermission(session, 'certificates.create')) {
            return NextResponse.json(permissionDeniedResponse('certificates.create'), { status: 403 });
        }

        await connectDB();
        const body = await request.json();

        let certificateId = body.CertificateId?.trim();
        if (certificateId) {
            const exists = await Certificate.findOne({ CertificateId: certificateId });
            if (exists) {
                return NextResponse.json({ success: false, error: 'Certificate ID already exists' }, { status: 409 });
            }
        } else {
            certificateId = generateCertificateId();
            let exists = await Certificate.findOne({ CertificateId: certificateId });
            while (exists) {
                certificateId = generateCertificateId();
                exists = await Certificate.findOne({ CertificateId: certificateId });
            }
        }

        const certificate = await Certificate.create({
            ...body,
            description: body.description || undefined,
            CertificateId: certificateId,
            createdAt: body.createdAt || new Date(),
        });

        return NextResponse.json(certificate, { status: 201 });
    } catch (error) {
        console.error('Error creating certificate:', error);
        return NextResponse.json({ success: false, error: 'Failed to create certificate' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as UserSession | null;
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!checkPermission(session, 'certificates.update')) {
            return NextResponse.json(permissionDeniedResponse('certificates.update'), { status: 403 });
        }

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Certificate ID required' }, { status: 400 });
        }

        const body = await request.json();
        const existingCertificate = await Certificate.findById(id);

        if (!existingCertificate) {
            return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
        }

        const trimmedCertificateId = body.CertificateId?.trim();
        if (
            trimmedCertificateId &&
            trimmedCertificateId !== existingCertificate.CertificateId
        ) {
            const duplicate = await Certificate.findOne({ CertificateId: trimmedCertificateId });
            if (duplicate) {
                return NextResponse.json({ success: false, error: 'Certificate ID already exists' }, { status: 409 });
            }
        }

        const updatedCertificate = await Certificate.findByIdAndUpdate(
            id,
            {
                CertificateId: trimmedCertificateId || existingCertificate.CertificateId,
                name: body.name ?? existingCertificate.name,
                position: body.position ?? existingCertificate.position,
                club: body.club || undefined,
                joinedFrom: body.joinedFrom || undefined,
                joinedTo: body.joinedTo || undefined,
                description: body.description || undefined,
                createdAt: body.createdAt || existingCertificate.createdAt,
            },
            { new: true, runValidators: true }
        );

        return NextResponse.json(updatedCertificate);
    } catch (error) {
        console.error('Error updating certificate:', error);
        return NextResponse.json({ success: false, error: 'Failed to update certificate' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as UserSession | null;
        if (!session) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (!checkPermission(session, 'certificates.delete')) {
            return NextResponse.json(permissionDeniedResponse('certificates.delete'), { status: 403 });
        }

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Certificate ID required' }, { status: 400 });
        }

        const certificate = await Certificate.findByIdAndDelete(id);

        if (!certificate) {
            return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({ success: false, error: 'Failed to delete certificate' }, { status: 500 });
    }
}