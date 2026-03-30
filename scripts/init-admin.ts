import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '../.env.local') });

import connectDB from '../lib/connectdb';
import User from '../schema/UserSchema';
import Role from '../schema/RoleSchema';
import bcrypt from 'bcrypt';

async function createInitialAdmin() {
  try {
    await connectDB();
    
    const existingUsers = await User.find({});
    if (existingUsers.length > 0) {
      console.log(' Users already exist in the database. Cannot create initial admin.');
      console.log(' Use the Users management page to create additional users.');
      return;
    }

    const superAdminRole = await Role.findOne({ name: 'Super Admin' });
    if (!superAdminRole) {
      console.log('Super Admin role not found. Please run the role seeding script first:');
      console.log('npm run seed:roles');
      return;
    }

    const defaultAdmin = {
      name: 'Super Admin',
      email: 'admin@stc.com',
      password: 'admin123456' 
    };

    console.log('Creating Initial Super Admin User');
    console.log(` Name: ${defaultAdmin.name}`);
    console.log(`  Email: ${defaultAdmin.email}`);
    console.log(' Password: admin123456 (CHANGE THIS IMMEDIATELY!)');
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(defaultAdmin.password, 12);
    console.log('Creating admin user...');
    const adminUser = new User({
      name: defaultAdmin.name,
      email: defaultAdmin.email,
      hashedPassword,
      roleId: superAdminRole._id,
      isActive: true,
      createdBy: null 
    });

    await adminUser.save();

    console.log(' Initial Super Admin user created successfully!');
    console.log(` User ID: ${adminUser._id}`);
    console.log(`Role: Super Admin`);
    console.log(` Permissions: ${superAdminRole.permissions.length} permissions`);
    console.log('IMPORTANT: Change the default password immediately after first login!');
    console.log(' You can now log in to the admin panel.');

  } catch (error) {
    console.error('Error creating initial admin user:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('E11000 duplicate key error')) {
        console.log('This email address is already in use.');
      } else {
        console.log(`${error.message}`);
      }
    }
  }
}

export { createInitialAdmin };

if (require.main === module) {
  createInitialAdmin()
    .then(() => {
      console.log('Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
}