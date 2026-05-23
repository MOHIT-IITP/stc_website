import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectdb";
import {
  isQuestionPending,
  normalizeTechHuntAnswer,
  normalizeTechHuntAnswers,
} from "@/lib/techHunt";
import Team from "@/schema/Team";
import Route from "@/schema/TechHuntRoute";
import Verification from "@/schema/Verification";
import EventSettings from "@/schema/EventSettings";

type SubmitAnswerBody = {
  route?: string;
  email?: string;
  answer?: string;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeRoute(route: string) {
  return route.trim().toLowerCase();
}

async function getMembersStatus(team: any, level: number) {
  const verifications = await Verification.find({
    teamId: team._id,
    level: Number(level),
    isValid: true,
  }).lean();

  const verifiedEmails = verifications.map((verification: any) =>
    String(verification.memberEmail || "")
      .toLowerCase()
      .trim(),
  );

  return team.members.map((member: any) => {
    const memberEmail = String(member.email || "")
      .toLowerCase()
      .trim();
    return {
      name: member.name,
      email: member.email,
      verified: verifiedEmails.includes(memberEmail),
    };
  });
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as SubmitAnswerBody;
    const route = body.route ? normalizeRoute(body.route) : "";
    const email = body.email ? normalizeEmail(body.email) : "";
    const answer = body.answer ? body.answer.trim() : "";

    if (!route || !email || !answer) {
      return NextResponse.json(
        {
          success: false,
          message: "Route, email, and answer are required.",
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
          message: "No registered team found for this email.",
        },
        { status: 404 },
      );
    }

    if (team.status === "disqualified") {
      return NextResponse.json(
        {
          success: false,
          message: "This team has been disqualified.",
        },
        { status: 403 },
      );
    }

    const routeDoc = team.routeId as unknown as {
      levels: Array<{
        level: number;
        route: string;
        clue: string;
        question?: string;
        answer?: string;
      }>;
      totalLevels: number;
    };

    const currentLevel = team.currentLevel || 1;
    const currentCheckpoint = routeDoc.levels.find(
      (level) => level.level === currentLevel,
    );

    if (!currentCheckpoint) {
      if (team.completed) {
        return NextResponse.json({
          success: true,
          status: "completed",
          message: "Treasure hunt completed.",
          teamName: team.teamName,
          currentLevel: team.currentLevel,
          totalLevels: routeDoc.totalLevels,
          verifiedCount: team.members.length,
          totalMembers: team.members.length,
          members: team.members.map((member: any) => ({
            name: member.name,
            email: member.email,
            verified: true,
          })),
          nextClue: "Report to the organizers.",
          clue: "Report to the organizers.",
          completedAt: team.completedAt,
        });
      }

      return NextResponse.json(
        {
          success: false,
          message: "No active challenge is available for this team.",
        },
        { status: 400 },
      );
    }

    if (normalizeRoute(route) !== normalizeRoute(currentCheckpoint.route)) {
      return NextResponse.json(
        {
          success: false,
          message: "This answer is for the current checkpoint only.",
        },
        { status: 400 },
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
          message: "This email is not registered in the team.",
        },
        { status: 404 },
      );
    }

    if (
      !isQuestionPending(team, currentLevel) ||
      String(team.questionUnlockedFor || "")
        .toLowerCase()
        .trim() !== email
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Question is not unlocked for this member.",
        },
        { status: 403 },
      );
    }

    const verifiedCount = await Verification.countDocuments({
      teamId: team._id,
      level: currentLevel,
      isValid: true,
    });

    if (verifiedCount < team.members.length) {
      return NextResponse.json(
        {
          success: false,
          message: "All team members must verify before answering.",
        },
        { status: 400 },
      );
    }

    const expectedAnswers = normalizeTechHuntAnswers(currentCheckpoint.answer);
    const submittedAnswer = normalizeTechHuntAnswer(answer);

    if (!submittedAnswer || !expectedAnswers.includes(submittedAnswer)) {
      return NextResponse.json({
        success: false,
        message: "Incorrect answer. Try again.",
      });
    }

    const nextLevel = currentLevel + 1;
    const nextCheckpoint = routeDoc.levels.find(
      (level) => level.level === nextLevel,
    );

    team.questionLevel = null;
    team.questionUnlockedFor = null;
    team.questionUnlockedAt = null;

    if (currentLevel >= routeDoc.totalLevels) {
      team.status = "completed";
      team.completed = true;
      team.completedAt = team.completedAt || new Date();
      team.currentLevel = currentLevel + 1;
      await team.save();

      try {
        const mod = await import("@/lib/techHuntRealtime");
        await mod.broadcastTechHuntEvent("level_completed", {
          teamId: team._id.toString(),
          teamName: team.teamName,
          routeCode: team.routeCode,
          level: currentLevel,
          completed: true,
          nextClue: "Report to the organizers.",
        });
      } catch (e) {
        // realtime disabled — ignore
      }

      return NextResponse.json({
        success: true,
        levelCompleted: true,
        status: "completed",
        message: "Treasure hunt completed.",
        teamName: team.teamName,
        currentLevel: team.currentLevel,
        totalLevels: routeDoc.totalLevels,
        verifiedCount,
        totalMembers: team.members.length,
        members: team.members.map((member: any) => ({
          name: member.name,
          email: member.email,
          verified: true,
        })),
        nextClue: "Report to the organizers.",
        clue: "Report to the organizers.",
        completedAt: team.completedAt,
      });
    }

    team.currentLevel = nextLevel;
    team.status = "active";
    await team.save();

    try {
      const mod = await import("@/lib/techHuntRealtime");
      await mod.broadcastTechHuntEvent("level_completed", {
        teamId: team._id.toString(),
        teamName: team.teamName,
        routeCode: team.routeCode,
        level: currentLevel,
        nextLevel,
        completed: false,
        nextClue: nextCheckpoint?.clue || "",
      });
    } catch (e) {
      // realtime disabled — ignore
    }

    return NextResponse.json({
      success: true,
      levelCompleted: true,
      status: "level_completed",
      message: "Answer correct. Next clue unlocked.",
      teamName: team.teamName,
      currentLevel: team.currentLevel,
      totalLevels: routeDoc.totalLevels,
      verifiedCount,
      totalMembers: team.members.length,
      members: await getMembersStatus(team, currentLevel),
      nextClue: nextCheckpoint?.clue,
      clue: nextCheckpoint?.clue,
    });
  } catch (error) {
    console.error("Treasure Hunt answer submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit answer.",
      },
      { status: 500 },
    );
  }
}
