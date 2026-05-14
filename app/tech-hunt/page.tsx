import type { Metadata } from "next";
import connectDB from "@/lib/connectdb";
import Route from "@/schema/TechHuntRoute";
import TechHuntExperience from "@/app/tech-hunt/TechHuntExperience";

export const metadata: Metadata = {
  title: "Phoenix Tech Hunt | STC IIT Patna",
  description:
    "Mysterious mobile-first treasure hunt experience for participants scanning campus QR checkpoints.",
};

type PageProps = {
  searchParams?: Promise<{
    route?: string | string[];
  }>;
};

function RouteNotFound({ route }: { route: string }) {
  return (
    <main className="min-h-screen bg-[#020b09] text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Route Not Found</h1>
        <p className="text-lg text-slate-300 mb-8">
          The route{" "}
          <span className="font-semibold text-emerald-200">"{route}"</span> is
          not defined in this event.
        </p>
        <a
          href="/tech-hunt"
          className="inline-block px-6 py-3 bg-[#B8FFE1] text-[#052015] font-semibold rounded hover:bg-[#D2FFE9] transition"
        >
          Return to Landing
        </a>
      </div>
    </main>
  );
}

export default async function TechHuntPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const route = Array.isArray(resolvedSearchParams?.route)
    ? resolvedSearchParams?.route[0]
    : resolvedSearchParams?.route;

  // If route is provided, validate it exists in database
  if (route) {
    await connectDB();
    const routeExists = await Route.findOne({
      "levels.route": route.toLowerCase().trim(),
    });

    if (!routeExists) {
      return <RouteNotFound route={route} />;
    }
  }

  return <TechHuntExperience route={route} />;
}
