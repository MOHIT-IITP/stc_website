import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectdb";
import Team from "@/schema/Team";
import Route from "@/schema/TechHuntRoute";
import Verification from "@/schema/Verification";
import EventSettings from "@/schema/EventSettings";

type VerifyBody = {
  route?: string;
  email?: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeRoute(route: string) {
  return route.trim().toLowerCase();
}

async function getMembersStatus(team: any, level: number) {
  const teamId = team._id.toString();

  // Fetch all valid verifications for this team and level
  const verifications = await Verification.find({
    teamId: team._id,
    level: Number(level),
    isValid: true,
  }).lean();

  // Create a normalized list of verified emails
  const verifiedEmails = verifications.map((v: any) =>
    String(v.memberEmail || "").toLowerCase().trim(),
  );

  // Map team members to their status, ensuring we handle both doc and plain object formats
  return team.members.map((m: any) => {
    const mEmail = String(m.email || "").toLowerCase().trim();
    const isVerified = verifiedEmails.includes(mEmail);

    return {
      name: m.name,
      email: m.email,
      verified: isVerified,
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const route = normalizeRoute(
      request.nextUrl.searchParams.get("route") || "",
    );
    const email = normalizeEmail(
      request.nextUrl.searchParams.get("email") || "",
    );

    if (!route || !email) {
      return NextResponse.json(
        {
          success: false,
          status: "error",
          message: "Route and email are required.",
        },
        { status: 400 },
      );
    }

    const team = await Team.findOne({
      $or: [{ leaderEmail: email }, { "members.email": email }],
    }).populate({ path: "routeId", model: Route });

    if (!team) {
      return NextResponse.json(
        {
          success: false,
          status: "error",
          message: "No registered team found for this email.",
        },
        { status: 404 },
      );
    }

    const routeDoc = team.routeId as unknown as {
      levels: Array<{ level: number; route: string; clue: string }>;
      totalLevels: number;
    };
    const currentLevel = team.currentLevel || 1;
    const currentCheckpoint = routeDoc.levels.find(
      (level) => level.level === currentLevel,
    );
    const currentRouteCheckpoint = routeDoc.levels.find(
      (level) => level.route === route,
    );

    if (!currentCheckpoint || team.completed) {
      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Treasure hunt completed.",
        teamName: team.teamName,
        currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount: team.members.length,
        totalMembers: team.members.length,
        members: team.members.map((m: any) => ({
          name: m.name,
          email: m.email,
          verified: true,
        })),
        completedAt: team.completedAt,
      });
    }

    if (!currentRouteCheckpoint) {
      const verifiedCount = await Verification.countDocuments({
        teamId: team._id,
        level: currentLevel,
        isValid: true,
      });
      const allMembersVerified = verifiedCount >= team.members.length;

      return NextResponse.json({
        success: true,
        status: allMembersVerified ? "wrong_route" : "not_all_verified",
        message: allMembersVerified
          ? "This QR is not part of your team route."
          : "Not all team members have verified on the current checkpoint. All members must verify before progression.",
        teamName: team.teamName,
        currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, currentLevel),
      });
    }

    const requestedLevel = currentRouteCheckpoint.level;
    const verifiedCount = await Verification.countDocuments({
      teamId: team._id,
      level: requestedLevel,
      isValid: true,
    });

    const memberAlreadyVerified = await Verification.exists({
      teamId: team._id,
      memberEmail: email,
      level: requestedLevel,
      isValid: true,
    });

    if (requestedLevel < currentLevel) {
      const nextLevel = routeDoc.levels.find(
        (level) => level.level === requestedLevel + 1,
      );
      const levelWasCompleted = verifiedCount >= team.members.length;

      if (memberAlreadyVerified) {
        return NextResponse.json({
          success: true,
          status: levelWasCompleted ? "level_completed" : "duplicate",
          message: levelWasCompleted
            ? "This checkpoint was already completed earlier."
            : "Your verification for this checkpoint was already recorded.",
          teamName: team.teamName,
          currentLevel: requestedLevel,
          totalLevels: routeDoc.totalLevels,
          verifiedCount,
          totalMembers: team.members.length,
          members: await getMembersStatus(team, requestedLevel),
          clue: levelWasCompleted ? nextLevel?.clue : undefined,
        });
      }

      return NextResponse.json({
        success: true,
        status: "waiting",
        message: "You have not verified this earlier checkpoint yet.",
        teamName: team.teamName,
        currentLevel: requestedLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, requestedLevel),
      });
    }

    if (requestedLevel > currentLevel) {
      // Check if all team members have verified on current level
      const currentLevelVerifiedCount = await Verification.countDocuments({
        teamId: team._id,
        level: currentLevel,
        isValid: true,
      });
      const allMembersVerified =
        currentLevelVerifiedCount >= team.members.length;

      return NextResponse.json({
        success: true,
        status: allMembersVerified ? "wrong_route" : "not_all_verified",
        message: allMembersVerified
          ? "This QR is for a future checkpoint."
          : "Not all team members have verified on the current checkpoint. All members must verify before progression.",
        teamName: team.teamName,
        currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount: currentLevelVerifiedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, currentLevel),
      });
    }

    if (currentCheckpoint.route !== route) {
      return NextResponse.json({
        success: true,
        status: "wrong_route",
        message: "This QR is not your current checkpoint anymore.",
        teamName: team.teamName,
        currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, requestedLevel),
      });
    }

    return NextResponse.json({
      success: true,
      status: memberAlreadyVerified ? "duplicate" : "waiting",
      message: memberAlreadyVerified
        ? "Your verification is already recorded. Progress synced."
        : "Waiting for remaining teammates.",
      teamName: team.teamName,
      currentLevel,
      totalLevels: routeDoc.totalLevels,
      verifiedCount,
      totalMembers: team.members.length,
      members: await getMembersStatus(team, requestedLevel),
    });
  } catch (error) {
    console.error("Tech Hunt progress sync failed:", error);
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "Failed to sync checkpoint progress.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as VerifyBody;
    const route = body.route ? normalizeRoute(body.route) : "";
    const email = body.email ? normalizeEmail(body.email) : "";

    if (!route || !email) {
      return NextResponse.json(
        {
          success: false,
          status: "error",
          message: "Route and email are required.",
        },
        { status: 400 },
      );
    }

    let settings = await EventSettings.findOne();
    if (!settings) {
      settings = await EventSettings.create({
        techHuntActive: false,
        cooldownDuration: 60,
        maxAttemptsPerMinute: 10,
      });
    }

    if (!settings.techHuntActive) {
      return NextResponse.json(
        {
          success: false,
          status: "event_inactive",
          message: "The hunt is not active right now.",
        },
        { status: 403 },
      );
    }

    const team = await Team.findOne({
      $or: [{ leaderEmail: email }, { "members.email": email }],
    }).populate({ path: "routeId", model: Route });

    if (!team) {
      return NextResponse.json(
        {
          success: false,
          status: "error",
          message: "No registered team found for this email.",
        },
        { status: 404 },
      );
    }

    const routeDoc = team.routeId as unknown as {
      levels: Array<{ level: number; route: string; clue: string }>;
      totalLevels: number;
    };
    const currentLevel = team.currentLevel || 1;
    const currentCheckpoint = routeDoc.levels.find(
      (level) => level.level === currentLevel,
    );
    const requestedCheckpoint = routeDoc.levels.find(
      (level) => level.route === route,
    );

    if (!currentCheckpoint) {
      team.completed = true;
      team.completedAt = team.completedAt || new Date();
      team.status = "completed";
      await team.save();

      return NextResponse.json({
        success: true,
        status: "completed",
        teamName: team.teamName,
        currentLevel: team.currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount: team.members.length,
        totalMembers: team.members.length,
        members: team.members.map((m: any) => ({
          name: m.name,
          email: m.email,
          verified: true,
        })),
        clue: "Report to the organizers.",
        completedAt: team.completedAt,
        message: "Treasure hunt completed.",
      });
    }

    if (team.status === "disqualified") {
      return NextResponse.json(
        {
          success: false,
          status: "error",
          message: "This team has been disqualified.",
        },
        { status: 403 },
      );
    }

    if (
      team.cooldownUntil &&
      new Date(team.cooldownUntil).getTime() > Date.now()
    ) {
      return NextResponse.json(
        {
          success: false,
          status: "cooldown",
          message: "Cooldown active.",
          cooldownUntil: team.cooldownUntil,
          retryAfterSeconds: Math.ceil(
            (new Date(team.cooldownUntil).getTime() - Date.now()) / 1000,
          ),
        },
        { status: 429 },
      );
    }

    const member = team.members.find(
      (teamMember: { email: string }) =>
        teamMember.email.toLowerCase() === email,
    );
    if (!member) {
      return NextResponse.json(
        {
          success: false,
          status: "error",
          message: "This email is not registered in the team.",
        },
        { status: 404 },
      );
    }

    if (requestedCheckpoint && requestedCheckpoint.level < currentLevel) {
      const requestedLevel = requestedCheckpoint.level;
      const completedCount = await Verification.countDocuments({
        teamId: team._id,
        level: requestedLevel,
        isValid: true,
      });
      const alreadyVerified = await Verification.exists({
        teamId: team._id,
        memberEmail: email,
        level: requestedLevel,
        isValid: true,
      });
      const nextLevel = routeDoc.levels.find(
        (level) => level.level === requestedLevel + 1,
      );

      return NextResponse.json({
        success: true,
        status: alreadyVerified
          ? completedCount >= team.members.length
            ? "level_completed"
            : "duplicate"
          : "waiting",
        message: alreadyVerified
          ? completedCount >= team.members.length
            ? "This checkpoint was already completed earlier."
            : "This member has already verified this checkpoint."
          : "You have not verified this earlier checkpoint yet.",
        teamName: team.teamName,
        currentLevel: requestedLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount: completedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, requestedLevel),
        clue:
          completedCount >= team.members.length ? nextLevel?.clue : undefined,
      });
    }

    if (!requestedCheckpoint || requestedCheckpoint.level > currentLevel) {
      // Check if all team members have verified on current level
      const currentLevelVerifiedCount = await Verification.countDocuments({
        teamId: team._id,
        level: currentLevel,
        isValid: true,
      });
      const allMembersVerified =
        currentLevelVerifiedCount >= team.members.length;

      team.cooldownUntil = new Date(
        Date.now() + settings.cooldownDuration * 1000,
      );
      await team.save();

      if (!allMembersVerified) {
        return NextResponse.json(
          {
            success: false,
            status: "not_all_verified",
            message:
              "Not all team members have verified on the current checkpoint. All members must verify before progression.",
            verifiedCount: currentLevelVerifiedCount,
            totalMembers: team.members.length,
            members: await getMembersStatus(team, currentLevel),
            cooldownUntil: team.cooldownUntil,
            retryAfterSeconds: settings.cooldownDuration,
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        {
          success: false,
          status: "wrong_route",
          message: !requestedCheckpoint
            ? "This QR is not part of your team route."
            : "This QR is for a future checkpoint.",
          cooldownUntil: team.cooldownUntil,
          retryAfterSeconds: settings.cooldownDuration,
        },
        { status: 400 },
      );
    }

    if (currentCheckpoint.route !== route) {
      team.cooldownUntil = new Date(
        Date.now() + settings.cooldownDuration * 1000,
      );
      await team.save();

      return NextResponse.json(
        {
          success: false,
          status: "wrong_route",
          message: "Wrong path detected.",
          cooldownUntil: team.cooldownUntil,
          retryAfterSeconds: settings.cooldownDuration,
        },
        { status: 400 },
      );
    }

    const alreadyVerified = await Verification.findOne({
      teamId: team._id,
      memberEmail: email,
      level: currentLevel,
      isValid: true,
    });

    if (alreadyVerified) {
      const verifiedCount = await Verification.countDocuments({
        teamId: team._id,
        level: currentLevel,
        isValid: true,
      });

      return NextResponse.json({
        success: false,
        status: "duplicate",
        message: "This member has already verified this checkpoint.",
        teamName: team.teamName,
        currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, currentLevel),
      });
    }

    await Verification.create({
      teamId: team._id,
      routeId: team.routeId,
      memberEmail: email,
      scannedRoute: route,
      level: currentLevel,
      isValid: true,
      verifiedAt: new Date(),
    });

    const verifiedCount = await Verification.countDocuments({
      teamId: team._id,
      level: currentLevel,
      isValid: true,
    });

    if (verifiedCount < team.members.length) {
      return NextResponse.json({
        success: true,
        status: "waiting",
        message: "Waiting for remaining teammates.",
        teamName: team.teamName,
        currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: await getMembersStatus(team, currentLevel),
      });
    }

    if (currentLevel >= routeDoc.totalLevels) {
      team.status = "completed";
      team.completed = true;
      team.completedAt = team.completedAt || new Date();
      team.currentLevel = currentLevel + 1;
      await team.save();

      return NextResponse.json({
        success: true,
        status: "completed",
        message: "Treasure hunt completed.",
        teamName: team.teamName,
        currentLevel: team.currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: team.members.map((m: any) => ({
          name: m.name,
          email: m.email,
          verified: true,
        })),
        clue: "Report to the organizers.",
        completedAt: team.completedAt,
      });
    }

    team.currentLevel = currentLevel + 1;
    team.status = "active";
    await team.save();

    const nextLevel = routeDoc.levels.find(
      (level) => level.level === team.currentLevel,
    );

    return NextResponse.json({
      success: true,
      status: "level_completed",
      message: "Level completed.",
      teamName: team.teamName,
      currentLevel: team.currentLevel,
      totalLevels: routeDoc.totalLevels,
      verifiedCount,
      totalMembers: team.members.length,
      members: await getMembersStatus(team, currentLevel),
      clue: nextLevel?.clue,
    });
  } catch (error) {
    console.error("Tech Hunt verification failed:", error);
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "Failed to verify checkpoint.",
      },
      { status: 500 },
    );
  }
}
