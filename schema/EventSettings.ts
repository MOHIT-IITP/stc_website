import mongoose, { Schema, Document } from "mongoose";

export interface IEventSettings extends Document {
  techHuntActive: boolean;
  cooldownDuration: number;
  maxAttemptsPerMinute: number;
  eventStartedAt?: Date;
}

const EventSettingsSchema = new Schema<IEventSettings>(
  {
    techHuntActive: {
      type: Boolean,
      default: false,
    },

    cooldownDuration: {
      type: Number,
      default: 60,
    },

    maxAttemptsPerMinute: {
      type: Number,
      default: 10,
    },

    eventStartedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.EventSettings ||
  mongoose.model<IEventSettings>("EventSettings", EventSettingsSchema);
