import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMember {
  name: string;
  email: string;
}

export interface ITeam extends Document {
  teamName: string;
  leaderName: string;
  leaderEmail: string;

  members: IMember[];
  routeId: Types.ObjectId;
  routeCode: string;
  currentLevel: number;
  status: "pending" | "active" | "completed" | "disqualified";
  cooldownUntil?: Date;
  startedAt: Date;
  completed: boolean;
  completedAt?: Date;
  rank?: number;
}

const MemberSchema = new Schema<IMember>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { _id: false },
);

const TeamSchema = new Schema<ITeam>(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    leaderName: {
      type: String,
      required: true,
      trim: true,
    },

    leaderEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    members: {
      type: [MemberSchema],

      validate: [
        {
          validator: function (members: IMember[]) {
            return members.length >= 2 && members.length <= 4;
          },
          message: "Team must contain between 2 and 4 members",
        },

        {
          validator: function (members: IMember[]) {
            const emails = members.map((m) => m.email);
            return emails.length === new Set(emails).size;
          },
          message: "Duplicate member emails are not allowed",
        },
      ],
    },

    routeId: {
      type: Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },

    routeCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      index: true,
    },

    currentLevel: {
      type: Number,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "active", "completed", "disqualified"],
      default: "pending",
    },

    cooldownUntil: {
      type: Date,
      default: null,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    rank: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Team ||
  mongoose.model<ITeam>("Team", TeamSchema);
