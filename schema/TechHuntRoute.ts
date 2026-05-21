import mongoose, { Schema, Document } from "mongoose";

export interface ILevel {
  level: number;
  route: string;
  clue: string;
  question: string;
  answer: string;
  imageUrl?: string | null;
}

export interface IRoute extends Document {
  routeCode: string;

  levels: ILevel[];

  totalLevels: number;
}

const LevelSchema = new Schema<ILevel>(
  {
    level: {
      type: Number,
      required: true,
      min: 1,
    },

    route: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    clue: {
      type: String,
      required: true,
      trim: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  { _id: false },
);

const RouteSchema = new Schema<IRoute>(
  {
    routeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    levels: {
      type: [LevelSchema],

      validate: {
        validator: function (levels: ILevel[]) {
          return levels.length > 0;
        },
        message: "Route must contain at least one level",
      },
    },

    totalLevels: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

RouteSchema.pre("save", function (next) {
  this.totalLevels = this.levels.length;
  next();
});

export default mongoose.models.Route ||
  mongoose.model<IRoute>("Route", RouteSchema);
