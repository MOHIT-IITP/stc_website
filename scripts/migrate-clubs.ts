import mongoose from 'mongoose';
import { clubsData } from './data-extraction';
import connectDB from '../lib/connectdb';

// Import all schemas to ensure they're registered
import '../schema/WingSchema';
import '../schema/ClubSchema';
import '../schema/MemberSchema';

require('dotenv').config();

async function migrateClubs() {
  try {
    console.log('🚀 Starting Clubs Migration...');
    
    // Connect to database directly to avoid connection issues
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stc-website';
    console.log('🔗 MongoDB URI:', mongoUri.substring(0, 50) + '...');
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to database');

    // Use existing models (now registered)
    const Wing = mongoose.model('Wing');
    const Club = mongoose.model('Club');

    // Verify wings exist first
    const wings = await Wing.find({});
    if (wings.length === 0) {
      console.log('❌ No wings found. Please run wings migration first.');
      process.exit(1);
    }
    console.log(`✅ Found ${wings.length} wings in database`);

    // Check existing clubs and clean up
    const existingClubs = await Club.find({});
    if (existingClubs.length > 0) {
      console.log(`⚠️  Found ${existingClubs.length} existing clubs`);
      console.log('🗑️  Clearing existing clubs...');
      await Club.deleteMany({});
    }
    
    // Drop any problematic indexes
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection('clubs');
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

    // Insert clubs data
    console.log('📦 Inserting clubs data...');
    const insertedClubs = await Club.insertMany(clubsData);
    
    console.log(`✅ Successfully inserted ${insertedClubs.length} clubs:`);
    
    // Group by wing for better display
    const clubsByWing: Record<string, any[]> = {};
    insertedClubs.forEach(club => {
      if (!clubsByWing[club.wingId]) {
        clubsByWing[club.wingId] = [];
      }
      clubsByWing[club.wingId].push(club);
    });

    Object.entries(clubsByWing).forEach(([wingId, clubs]: [string, any[]]) => {
      console.log(`\n  📋 ${wingId.toUpperCase()} Wing:`);
      clubs.forEach((club: any, index: number) => {
        console.log(`    ${index + 1}. ${club.title} (${club.id})`);
      });
    });

    await mongoose.disconnect();
    console.log('\n✅ Database connection closed');
    console.log('🎉 Clubs migration completed successfully!');

  } catch (error) {
    console.error('❌ Clubs migration failed:', error);
    process.exit(1);
  }
}

// Run the migration if called directly
if (require.main === module) {
  migrateClubs();
}

export { migrateClubs };
