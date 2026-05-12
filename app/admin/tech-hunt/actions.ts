"use server"

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
  const teams = await Team.find().populate({ path: 'routeId', model: Route }).sort({ currentLevel: -1, completedAt: 1 }).lean();
  
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
  await Team.findByIdAndUpdate(teamId, { status });
  revalidatePath("/admin/tech-hunt");
}

export async function adjustTeamLevel(teamId: string, levelDelta: number) {
  await connectDB();
  const team = await Team.findById(teamId);
  if (team) {
    team.currentLevel = Math.max(1, team.currentLevel + levelDelta);
    await team.save();
    revalidatePath("/admin/tech-hunt");
  }
}

export async function clearTeamCooldown(teamId: string) {
  await connectDB();
  await Team.findByIdAndUpdate(teamId, { cooldownUntil: null });
  revalidatePath("/admin/tech-hunt");
}

export async function generateDemoData() {
  await connectDB();

  // Clear existing to avoid duplicates if pressed multiple times
  await Team.deleteMany({});
  await Route.deleteMany({});
  await Verification.deleteMany({});

  // 1. Create a dummy route
  const demoRoute = await Route.create({
    routeCode: "DEMO-123",
    levels: [
      { level: 1, route: "clh", clue: "First clue" },
      { level: 2, route: "library", clue: "Second clue" },
      { level: 3, route: "food-court", clue: "Third clue" }
    ],
    totalLevels: 3
  });

  // 2. Create 3 Teams
  const teamA = await Team.create({
    teamName: "Alpha Squad",
    leaderName: "Alice",
    leaderEmail: "alpha@example.com",
    members: [
      { name: "Alice", email: "alpha@example.com" },
      { name: "Bob", email: "bob@example.com" }
    ],
    routeId: demoRoute._id,
    currentLevel: 2,
    status: "active",
  });

  const teamB = await Team.create({
    teamName: "Beta Force",
    leaderName: "Charlie",
    leaderEmail: "charlie@example.com",
    members: [
      { name: "Charlie", email: "charlie@example.com" },
      { name: "Dave", email: "dave@example.com" },
      { name: "Eve", email: "eve@example.com" }
    ],
    routeId: demoRoute._id,
    currentLevel: 1,
    status: "pending",
  });

  const teamC = await Team.create({
    teamName: "Gamma Ray",
    leaderName: "Frank",
    leaderEmail: "gamma@example.com",
    members: [
      { name: "Frank", email: "gamma@example.com" },
      { name: "Grace", email: "grace@example.com" }
    ],
    routeId: demoRoute._id,
    currentLevel: 3,
    status: "active",
    completed: true,
    completedAt: new Date(),
  });

  // 3. Create Verifications (mocking best player data)
  await Verification.create([
    {
      teamId: teamA._id,
      routeId: demoRoute._id,
      memberEmail: "bob@example.com",
      scannedRoute: "clh",
      level: 1,
      isValid: true,
    },
    {
      teamId: teamC._id,
      routeId: demoRoute._id,
      memberEmail: "frank@example.com",
      scannedRoute: "clh",
      level: 1,
      isValid: true,
    },
    {
      teamId: teamC._id,
      routeId: demoRoute._id,
      memberEmail: "grace@example.com",
      scannedRoute: "library",
      level: 2,
      isValid: true,
    }
  ]);

  revalidatePath("/admin/tech-hunt");
}
