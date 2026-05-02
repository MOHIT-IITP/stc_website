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
  type: { 
    type: String, 
    required: true,
    enum: ["document", "image", "video", "archive", "link", "other"],
    default: "document"
  },
  fileUrl: { 
    type: String, 
    required: true,
    trim: true
  },
  fileName: { 
    type: String, 
    required: true,
    trim: true
  },
  fileSize: { 
    type: Number, 
    default: 0 
  },
  fileType: { 
    type: String, 
    trim: true
  },
  uploadedBy: { 
    type: String, 
    required: true,
    trim: true
  },
  category: { 
    type: String, 
    trim: true,
    default: "general"
  },
  tags: [{ 
    type: String, 
    trim: true 
  }],
  downloadCount: { 
    type: Number, 
    default: 0 
  },
  clubId: { 
    type: String, 
    ref: 'Club',
    required: true,
    index: true
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

ResourcesSchema.index({ clubId: 1, order: 1 });
ResourcesSchema.index({ isActive: 1 });
ResourcesSchema.index({ clubId: 1, isActive: 1 });
ResourcesSchema.index({ type: 1 });
ResourcesSchema.index({ category: 1 });

const Resources = mongoose.models.Resources || mongoose.model("Resources", ResourcesSchema);
export default Resources;
