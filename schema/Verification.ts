import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVerification extends Document {
  teamId: Types.ObjectId;
  routeId: Types.ObjectId;
  memberEmail: string;
  scannedRoute: string;
  level: number;
  isValid: boolean;
  verifiedAt: Date;
}

const VerificationSchema = new Schema<IVerification>(
  {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
      index: true,
    },

    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },

    memberEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    scannedRoute: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    level: {
      type: Number,
      required: true,
      min: 1,
      index: true,
    },

    isValid: {
      type: Boolean,
      default: true,
    },

    verifiedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

VerificationSchema.index(
  {
    teamId: 1,
    memberEmail: 1,
    level: 1,
  },
  {
    unique: true,
  },
);

VerificationSchema.index({ teamId: 1, level: 1, verifiedAt: 1 });

export default mongoose.models.Verification ||
  mongoose.model<IVerification>("Verification", VerificationSchema);
