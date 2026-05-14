"use server";

import connectDB from "@/lib/connectdb";
import Team from "@/schema/Team";
import EventSettings from "@/schema/EventSettings";
import Route from "@/schema/TechHuntRoute";
import Verification from "@/schema/Verification";
import { revalidatePath } from "next/cache";

export async function getDashboardData() {
  await connectDB();

  // Ensure EventSettings exists
  let settings = await EventSettings.findOne();
  if (!settings) {
    settings = await EventSettings.create({
      techHuntActive: false,
      cooldownDuration: 60,
      maxAttemptsPerMinute: 10,
    });
  }

  // Check routes count for sanity
  const routes = await Route.find().lean();

  // Fetch all teams
  const teams = await Team.find()
    .populate({ path: "routeId", model: Route })
    .sort({ currentLevel: -1, completedAt: 1 })
    .lean();

  // Fetch all verifications
  const verifications = await Verification.find().lean();

  // process the response to deal with ObjectIds & Dates (since we pass to Client Component)
  return JSON.parse(JSON.stringify({ settings, teams, verifications, routes }));
}

export async function toggleEventStatus(currentStatus: boolean) {
  await connectDB();
  const settings = await EventSettings.findOne();
  if (settings) {
    settings.techHuntActive = !currentStatus;
    if (!currentStatus && !settings.eventStartedAt) {
      settings.eventStartedAt = new Date();
    }
    await settings.save();
    revalidatePath("/admin/tech-hunt");
  }
}

export async function updateTeamStatus(teamId: string, status: string) {
  await connectDB();
  const team = await Team.findById(teamId).populate({
    path: "routeId",
    model: Route,
  });

  if (!team) {
    return;
  }

  const update: {
    status: string;
    completed: boolean;
    completedAt: Date | null;
    currentLevel?: number;
  } = {
    status,
    completed: status === "completed",
    completedAt: status === "completed" ? team.completedAt || new Date() : null,
  };

  if (status === "completed") {
    const routeDoc = team.routeId as unknown as { totalLevels?: number } | null;
    const totalLevels = routeDoc?.totalLevels ?? team.currentLevel;
    update.currentLevel = totalLevels ?? team.currentLevel;
  }

  await Team.findByIdAndUpdate(teamId, update);
  revalidatePath("/admin/tech-hunt");
}

export async function adjustTeamLevel(teamId: string, levelDelta: number) {
  await connectDB();
  const team = await Team.findById(teamId).populate({
    path: "routeId",
    model: Route,
  });

  if (team) {
    const routeDoc = team.routeId as unknown as { totalLevels?: number } | null;
    const maxLevel = routeDoc?.totalLevels ?? 7;
    const nextLevel = Math.min(
      maxLevel,
      Math.max(1, team.currentLevel + levelDelta),
    );

    team.currentLevel = nextLevel;

    if (nextLevel >= maxLevel) {
      team.completed = true;
      team.status = "completed";
      team.completedAt = team.completedAt || new Date();
    } else {
      team.completed = false;
      team.completedAt = null;
      if (team.status === "completed") {
        team.status = "active";
      }
    }

    await team.save();
    revalidatePath("/admin/tech-hunt");
  }
}

export async function clearTeamCooldown(teamId: string) {
  await connectDB();
  await Team.findByIdAndUpdate(teamId, { cooldownUntil: null });
  revalidatePath("/admin/tech-hunt");
}
