import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Resources from '@/schema/ResourcesSchema';
import Club from '@/schema/ClubSchema';

export async function GET(request: NextRequest) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const clubId = searchParams.get('clubId');
    
    if (clubId) {
      // Get resources for specific club by clubId
      const club = await Club.findOne({ id: clubId.toLowerCase(), isActive: true });
      if (!club) {
        return NextResponse.json({ success: false, error: 'Club not found' }, { status: 404 });
      }
      
      const resources = await Resources.find({ clubId: club.id, isActive: true })
        .sort({ order: 1, createdAt: -1 });
      
      return NextResponse.json({ 
        success: true, 
        data: {
          club: {
            id: club.id,
            title: club.title,
            branch: club.branch,
            description: club.description,
            cardUrl: club.cardUrl
          },
          resources 
        }
      });
    }
    
    // Get all active clubs with resource count
    const clubs = await Club.find({ isActive: true }).sort({ order: 1, title: 1 });
    
    const clubsWithResources = await Promise.all(
      clubs.map(async (club) => {
        const resourceCount = await Resources.countDocuments({ clubId: club.id, isActive: true });
        return {
          _id: club._id,
          id: club.id,
          slug: club.id, // Use club.id as slug for navigation
          name: club.title,
          title: club.title,
          branch: club.branch,
          description: club.description,
          cardUrl: club.cardUrl,
          resourceCount,
          color: 'from-blue-500 to-indigo-600' // Default gradient color
        };
      })
    );
    
    return NextResponse.json({ success: true, data: clubsWithResources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();
    const { clubId, title, description, type, fileUrl, fileName, fileSize, fileType, category, tags, order, uploadedBy } = body;

    // Validation
    if (!clubId || !title || !fileUrl || !fileName) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: clubId, title, fileUrl, fileName'
      }, { status: 400 });
    }

    // Check if club exists
    const club = await Club.findOne({ id: clubId.toLowerCase(), isActive: true });
    if (!club) {
      return NextResponse.json({
        success: false,
        error: 'Club not found'
      }, { status: 400 });
    }

    const resource = new Resources({
      clubId: clubId.toLowerCase(),
      title,
      description: description || '',
      type: type || 'document',
      fileUrl,
      fileName,
      fileSize: fileSize || 0,
      fileType: fileType || '',
      uploadedBy: uploadedBy || 'Anonymous',
      category: category || 'general',
      tags: tags || [],
      order: order || 0
    });

    await resource.save();

    return NextResponse.json({
      success: true,
      data: resource
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create resource'
    }, { status: 500 });
  }
}
