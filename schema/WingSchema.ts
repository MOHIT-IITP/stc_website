import mongoose, { Schema } from "mongoose";

const WingSchema = new Schema({
  id: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  logoUrl: { 
    type: String, 
    required: true,
    trim: true
  },
  order: { 
    type: Number, 
    required: true,
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    required: true,
    default: true 
  }
}, {
  timestamps: true
});

WingSchema.index({ order: 1 });
WingSchema.index({ isActive: 1 });

const Wing = mongoose.models.Wing || mongoose.model("Wing", WingSchema);
export default Wing;
