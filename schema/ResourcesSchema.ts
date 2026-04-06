import mongoose, { Schema } from "mongoose";

const ResourcesSchema = new Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String, 
    trim: true,
    maxlength: 500
  },
  url: { 
    type: String, 
    required: true,
    trim: true
  },
  clubId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Club',
    required: true
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

ResourcesSchema.index({ clubId: 1, order: 1 });
ResourcesSchema.index({ isActive: 1 });

const Resources = mongoose.models.Resources || mongoose.model("Resources", ResourcesSchema);
export default Resources;
