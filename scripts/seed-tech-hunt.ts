import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "../.env") });

import connectDB from "../lib/connectdb";
import { TECH_HUNT_SEED_DATA } from "../config/techHuntSeedData";
import Team from "../schema/Team";
import Route from "../schema/TechHuntRoute";

async function seedTechHunt() {
  try {
    await connectDB();

    await Team.deleteMany({});
    await Route.deleteMany({});

    const routeDocs = await Route.create(
      TECH_HUNT_SEED_DATA.map((entry) => ({
        routeCode: entry.route.routeCode,
        levels: entry.route.levels,
        totalLevels: entry.route.levels.length,
      })),
    );

    const routeByCode = new Map(
      routeDocs.map((route) => [route.routeCode, route]),
    );

    await Team.create(
      TECH_HUNT_SEED_DATA.map((entry) => ({
        teamName: entry.teamName,
        leaderName: entry.leaderName,
        leaderEmail: entry.leaderEmail,
        members: entry.members,
        routeId: routeByCode.get(entry.route.routeCode)?._id,
        routeCode: entry.route.routeCode,
        currentLevel: 1,
        status: "pending" as const,
        completed: false,
      })),
    );

    console.log(
      `Seeded ${TECH_HUNT_SEED_DATA.length} Treasure Hunt teams and routes.`,
    );
  } catch (error) {
    console.error("Treasure Hunt seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedTechHunt().then(() => {
  if (!process.exitCode) {
    console.log("Treasure Hunt seed completed successfully");
  }
  process.exit(process.exitCode ?? 0);
});
