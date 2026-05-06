import mongoose from 'mongoose';
import { wingsData } from './data-extraction';
import connectDB from '../lib/connectdb';

// Import all schemas to ensure they're registered
import '../schema/WingSchema';
import '../schema/ClubSchema';
import '../schema/MemberSchema';

require('dotenv').config();

async function migrateWings() {
  try {
    console.log('🚀 Starting Wings Migration...');
    
    // Connect to database directly to avoid connection issues
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stc-website';
    console.log('🔗 MongoDB URI:', mongoUri.substring(0, 50) + '...');
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to database');

    // Use existing Wing model (now registered)
    const Wing = mongoose.model('Wing');

    // Check existing wings and clean up
    const existingWings = await Wing.find({});
    if (existingWings.length > 0) {
      console.log(`⚠️  Found ${existingWings.length} existing wings`);
      console.log('🗑️  Clearing existing wings...');
      await Wing.deleteMany({});
    }
    
    // Drop any problematic indexes
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection('wings');
        const indexes = await collection.indexes();
        console.log('📋 Existing indexes:', indexes.map(i => i.name));
        
        // Drop slug index if it exists
        if (indexes.some(index => index.name === 'slug_1')) {
          console.log('🗑️  Dropping problematic slug index...');
          await collection.dropIndex('slug_1');
          console.log('✅ Slug index dropped');
        }
      }
    } catch (indexError: any) {
      console.log('ℹ️  No problematic indexes found or unable to drop:', indexError?.message || indexError);
    }

    // Insert wings data
    console.log('📦 Inserting wings data...');
    const insertedWings = await Wing.insertMany(wingsData);
    
    console.log(`✅ Successfully inserted ${insertedWings.length} wings:`);
    insertedWings.forEach((wing, index) => {
      console.log(`  ${index + 1}. ${wing.name} (${wing.id})`);
    });

    await mongoose.disconnect();
    console.log('✅ Database connection closed');
    console.log('🎉 Wings migration completed successfully!');

  } catch (error) {
    console.error('❌ Wings migration failed:', error);
    process.exit(1);
  }
}

// Run the migration if called directly
if (require.main === module) {
  migrateWings();
}

export { migrateWings };
