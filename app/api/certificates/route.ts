import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Certificate from '@/schema/cretificateSchema';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const certificateId = searchParams.get('id');

        if (!certificateId) {
            return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
        }

        await connectDB();
        const certificate = await Certificate.findOne({ CertificateId: certificateId });

        if (!certificate) {
            return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, certificate });
    } catch (error) {
        console.error('Error fetching certificate:', error);
        return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 });
    }
}