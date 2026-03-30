import { config } from 'dotenv';
import path from 'path';

config({ path: path.join(__dirname, '../.env.local') });

import connectDB from '../lib/connectdb';
import Role from '../schema/RoleSchema';

async function seedDefaultRoles() {
  try {
    await connectDB();
    const existingRoles = await Role.find({});
    if (existingRoles.length > 0) {
      console.log('Roles already exist. Skipping seed.');
      return;
    }
    const defaultRoles = [
      {
        name: 'Super Admin',
        description: 'Full system access with user and role management',
        permissions: [
          'dashboard.read',
          'events.read', 'events.create', 'events.update', 'events.delete',
          'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete',
          'certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete',
          'registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete',
          'competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete',
          'users.read', 'users.create', 'users.update', 'users.delete',
          'roles.read', 'roles.create', 'roles.update', 'roles.delete'
        ],
        isSystemRole: true,
        isActive: true
      },
      {
        name: 'Admin',
        description: 'Content management access without user/role administration',
        permissions: [
          'dashboard.read',
          'events.read', 'events.create', 'events.update', 'events.delete',
          'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete',
          'certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete',
          'registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete',
          'competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete'
        ],
        isSystemRole: true,
        isActive: true
      },
      {
        name: 'Editor',
        description: 'Content creation and editing without delete permissions',
        permissions: [
          'dashboard.read',
          'events.read', 'events.create', 'events.update',
          'notifications.read', 'notifications.create', 'notifications.update',
          'certificates.read', 'certificates.create', 'certificates.update',
          'registrations.read', 'registrations.create', 'registrations.update',
          'competitions.read', 'competitions.create', 'competitions.update'
        ],
        isSystemRole: true,
        isActive: true
      },
      {
        name: 'Viewer',
        description: 'Read-only access to all content',
        permissions: [
          'dashboard.read',
          'events.read',
          'notifications.read',
          'certificates.read',
          'registrations.read',
          'competitions.read'
        ],
        isSystemRole: true,
        isActive: true
      }
    ];

    const createdRoles = await Role.insertMany(defaultRoles);
    
    console.log('Default roles seeded successfully:');
    createdRoles.forEach(role => {
      console.log(`  - ${role.name} (${role.permissions.length} permissions)`);
    });

    return createdRoles;
    
  } catch (error) {
    console.error('Error seeding default roles:', error);
    throw error;
  }
}
export { seedDefaultRoles };

if (require.main === module) {
  seedDefaultRoles()
    .then(() => {
      console.log('Seed completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}