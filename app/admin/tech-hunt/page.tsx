import "server-only";

import connectDB from "@/lib/connectdb";
import Team from "@/schema/Team";
import EventSettings from "@/schema/EventSettings";
import Route from "@/schema/TechHuntRoute";
import Verification from "@/schema/Verification";
import ClientDashboard from "./ClientDashboard";

export const dynamic = "force-dynamic";

export default async function TechHuntAdminPage() {
  await connectDB();

  let settings = await EventSettings.findOne();
  if (!settings) {
    settings = await EventSettings.create({
      techHuntActive: false,
      cooldownDuration: 60,
      maxAttemptsPerMinute: 10,
    });
  }

  const routes = await Route.find().lean();
  const teams = await Team.find()
    .populate({ path: "routeId", model: Route })
    .sort({ currentLevel: -1, completedAt: 1 })
    .lean();
  const verifications = await Verification.find().lean();

  const initialData = JSON.parse(
    JSON.stringify({ settings, teams, verifications, routes }),
  );

  return (
    <div className="container mx-auto p-6 max-w-[1600px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Tech Hunt Command Center
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor teams, manage event status, and analyze gameplay metrics.
        </p>
      </div>

      <ClientDashboard initialData={initialData} />
    </div>
  );
}
