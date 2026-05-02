import mongoose from 'mongoose';
import { membersData } from './data-extraction';
import connectDB from '../lib/connectdb';

// Import all schemas to ensure they're registered
import '../schema/WingSchema';
import '../schema/ClubSchema';
import '../schema/MemberSchema';

require('dotenv').config();

async function migrateMembers() {
  try {
    console.log('🚀 Starting Members Migration...');
    
    // Connect to database directly to avoid connection issues
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stc-website';
    console.log('🔗 MongoDB URI:', mongoUri.substring(0, 50) + '...');
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to database');

    // Use existing models (now registered)
    const Club = mongoose.model('Club');
    const Member = mongoose.model('Member');

    // Verify clubs exist first
    const clubs = await Club.find({});
    if (clubs.length === 0) {
      console.log('❌ No clubs found. Please run clubs migration first.');
      process.exit(1);
    }
    console.log(`✅ Found ${clubs.length} clubs in database`);

    // Check existing members and clean up
    const existingMembers = await Member.find({});
    if (existingMembers.length > 0) {
      console.log(`⚠️  Found ${existingMembers.length} existing members`);
      console.log('🗑️  Clearing existing members...');
      await Member.deleteMany({});
    }
    
    // Drop any problematic indexes
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection('members');
        const indexes = await collection.indexes();
        console.log('📋 Existing indexes:', indexes.map(i => i.name));
        
        // Drop slug index if it exists
        if (indexes.some(index => index.name === 'slug_1')) {
          console.log('🗑️  Dropping problematic slug index...');
          await collection.dropIndex('slug_1');
          console.log('✅ Slug index dropped');
        }
        
        // Drop name index if it exists
        if (indexes.some(index => index.name === 'name_1')) {
          console.log('🗑️  Dropping problematic name index...');
          await collection.dropIndex('name_1');
          console.log('✅ Name index dropped');
        }
      }
    } catch (indexError: any) {
      console.log('ℹ️  No problematic indexes found or unable to drop:', indexError?.message || indexError);
    }

    // Insert members data with lowercase clubId for consistency
    console.log('📦 Inserting members data...');
    const membersDataWithLowercaseClubId = membersData.map(member => ({
      ...member,
      clubId: member.clubId.toLowerCase()
    }));
    const insertedMembers = await Member.insertMany(membersDataWithLowercaseClubId);
    
    console.log(`✅ Successfully inserted ${insertedMembers.length} members:`);
    
    // Group by club for better display
    const membersByClub: Record<string, any[]> = {};
    insertedMembers.forEach(member => {
      if (!membersByClub[member.clubId]) {
        membersByClub[member.clubId] = [];
      }
      membersByClub[member.clubId].push(member);
    });

    // Get club names for display
    const clubMap: Record<string, string> = {};
    clubs.forEach(club => {
      clubMap[club.id] = club.title;
    });

    Object.entries(membersByClub).forEach(([clubId, members]: [string, any[]]) => {
      console.log(`\n  👥 ${clubMap[clubId] || clubId}:`);
      members.forEach((member: any, index: number) => {
        console.log(`    ${index + 1}. ${member.name} (${member.position})`);
      });
    });

    await mongoose.disconnect();
    console.log('\n✅ Database connection closed');
    console.log('🎉 Members migration completed successfully!');

  } catch (error) {
    console.error('❌ Members migration failed:', error);
    process.exit(1);
  }
}

// Run the migration if called directly
if (require.main === module) {
  migrateMembers();
}

export { migrateMembers };
