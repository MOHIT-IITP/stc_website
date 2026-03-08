import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
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
        await connectDB();
        const certificates = await Certificate.find().sort({ createdAt: -1 });
        return NextResponse.json(certificates);
    } catch (error) {
        console.error('Error fetching certificates:', error);
        return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const body = await request.json();

        let certificateId = body.CertificateId?.trim();
        if (certificateId) {
            const exists = await Certificate.findOne({ CertificateId: certificateId });
            if (exists) {
                return NextResponse.json({ error: 'Certificate ID already exists' }, { status: 409 });
            }
        } else {
            certificateId = generateCertificateId();
            let exists = await Certificate.findOne({ CertificateId: certificateId });
            while (exists) {
                certificateId = generateCertificateId();
                exists = await Certificate.findOne({ CertificateId: certificateId });
            }
        }

        console.log('Creating certificate with data:', { ...body, CertificateId: certificateId });

        const certificate = await Certificate.create({
            ...body,
            description: body.description || undefined,
            CertificateId: certificateId,
            createdAt: body.createdAt || new Date(),
        });

        return NextResponse.json(certificate, { status: 201 });
    } catch (error) {
        console.error('Error creating certificate:', error);
        return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Certificate ID required' }, { status: 400 });
        }

        const certificate = await Certificate.findByIdAndDelete(id);

        if (!certificate) {
            return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting certificate:', error);
        return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
    }
}