import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  hashedPassword: { 
    type: String, 
    required: true,
    minlength: 60 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  roleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role', 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLoginAt: { 
    type: Date,
    default: null
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    default: null
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(_doc, ret) {
      const { hashedPassword, ...rest } = ret;
      return rest;
    }
  }
});

// Indexes for performance
UserSchema.index({ roleId: 1 });
UserSchema.index({ isActive: 1 });

export default mongoose.models.User || mongoose.model('User', UserSchema);