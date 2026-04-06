import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import Resources from '@/schema/ResourcesSchema';
import Club from '@/schema/ClubSchema';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      // Get resources for specific club by slug
      const club = await Club.findOne({ slug: slug.toLowerCase(), isActive: true });
      if (!club) {
        return NextResponse.json({ success: false, error: 'Club not found' }, { status: 404 });
      }
      
      const resources = await Resources.find({ clubId: club._id, isActive: true })
        .sort({ order: 1, createdAt: -1 })
        .select('title description url order');
      
      return NextResponse.json({ 
        success: true, 
        data: {
          club: {
            _id: club._id,
            name: club.name,
            slug: club.slug,
            description: club.description,
            color: club.color
          },
          resources 
        }
      });
    }
    
    // Get all active clubs with resource count
    const clubs = await Club.find({ isActive: true }).sort({ order: 1, name: 1 });
    
    const clubsWithResources = await Promise.all(
      clubs.map(async (club) => {
        const resourceCount = await Resources.countDocuments({ clubId: club._id, isActive: true });
        return {
          _id: club._id,
          name: club.name,
          slug: club.slug,
          description: club.description,
          color: club.color,
          resourceCount
        };
      })
    );
    
    return NextResponse.json({ success: true, data: clubsWithResources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch resources' }, { status: 500 });
  }
}
