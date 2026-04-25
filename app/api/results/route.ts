import { NextResponse } from 'next/server';
import connectDB from '@/lib/connectdb';
import CompetitionResult from '@/schema/CompetitionResultSchema';

export async function GET() {
  try {
    await connectDB();
        
    const results = await CompetitionResult.find().sort({ createdAt: -1, rank: 1 });
    
    const publicResults = results.map(result => ({
      _id: result._id,
      name: result.name,
      competitionName: result.competitionName,
      club: result.club,
      rank: result.rank,
      rollNo: result.rollNo,
      createdAt: result.createdAt,
    }));

    return NextResponse.json(publicResults, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error fetching public competition results:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch competition results' }, { status: 500 });
  }
}
