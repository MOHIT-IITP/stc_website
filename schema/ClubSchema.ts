import mongoose, { Schema } from "mongoose";

const ClubSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    maxlength: 100
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: 500
  },
  color: {
    type: String,
    default: "from-blue-600 to-blue-800"
  },
  order: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdBy: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

ClubSchema.index({ isActive: 1, order: 1 });
ClubSchema.index({ slug: 1 });

const Club = mongoose.models.Club || mongoose.model("Club", ClubSchema);
export default Club;
