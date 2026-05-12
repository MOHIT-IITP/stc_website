import mongoose, { Schema, Document } from "mongoose";

const ALLOWED_ROUTES = [
  "clh",
  "library",
  "airplane",
  "food-court",
  "senate-hall",
  "ashima-hostel",
  "incubation-center",
];

export interface ILevel {
  level: number;
  route: string;
  clue: string;
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
      enum: ALLOWED_ROUTES,
    },

    clue: {
      type: String,
      required: true,
      trim: true,
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
