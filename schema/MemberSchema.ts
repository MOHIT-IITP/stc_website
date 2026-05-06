import mongoose, { Schema } from "mongoose";

const MemberSchema = new Schema({
  clubId: { 
    type: String, 
    required: true,
    ref: 'Club',
    index: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  position: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  linkedin: { 
    type: String, 
    trim: true
  },
  github: { 
    type: String, 
    trim: true
  },
  imgUrl: { 
    type: String, 
    required: true,
    trim: true
  },
  order: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

MemberSchema.index({ order: 1 });
MemberSchema.index({ isActive: 1 });
MemberSchema.index({ clubId: 1, isActive: 1 });
MemberSchema.index({ clubId: 1, order: 1 });

const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);
export default Member;
