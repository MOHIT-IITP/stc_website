import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: 500
  },
  permissions: [{
    type: String,
    required: true,
    enum: [
      // Dashboard 
      'dashboard.read',
      // Events   
      'events.read', 'events.create', 'events.update', 'events.delete',
      // Notifications 
      'notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete',
      // Certificates 
      'certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete',
      // Registration 
      'registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete',
      // Competition 
      'competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete',
      // User 
      'users.read', 'users.create', 'users.update', 'users.delete',
      // Role   
      'roles.read', 'roles.create', 'roles.update', 'roles.delete',
      // Resources
      'resources.read', 'resources.create', 'resources.update', 'resources.delete',
      // Clubs
      'clubs.read', 'clubs.create', 'clubs.update', 'clubs.delete',
      // Wings
      'wings.read', 'wings.create', 'wings.update', 'wings.delete',
      // Members
      'members.read', 'members.create', 'members.update', 'members.delete'
    ]
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  isSystemRole: { 
    type: Boolean, 
    default: false 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null 
  }
}, { 
  timestamps: true 
});

RoleSchema.index({ isActive: 1 });
RoleSchema.pre('save', function(next) {
  if (!this.permissions || this.permissions.length === 0) {
    next(new Error('Role must have at least one permission'));
  } else {
    next();
  }
});

export default mongoose.models.Role || mongoose.model('Role', RoleSchema);
