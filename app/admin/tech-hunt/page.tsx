import { getDashboardData } from "./actions";
import ClientDashboard from "./ClientDashboard";
// import ClientDashboard from "./ClientDashboard";

export const dynamic = "force-dynamic";

export default async function TechHuntAdminPage() {
  const initialData = await getDashboardData();
  
  return (
    <div className="container mx-auto p-6 max-w-[1600px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Tech Hunt Command Center</h1>
        <p className="text-muted-foreground mt-2">
          Monitor teams, manage event status, and analyze gameplay metrics.
        </p>
      </div>

      <ClientDashboard initialData={initialData} />
    </div>
  );
}