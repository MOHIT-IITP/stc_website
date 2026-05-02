"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { Loader2, FolderOpen, ChevronRight, Link as LinkIcon, FileText, Calendar, Upload } from "lucide-react";

interface Club {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  resourceCount: number;
}

export default function ResourcesPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/resources");
      const data = await response.json();
      if (data.success) {
        // Filter clubs to only show those with at least 1 resource
        const clubsWithResources = data.data.filter((club: Club) => club.resourceCount > 0);
        setClubs(clubsWithResources);
      } else {
        setError(data.error || "Failed to load clubs");
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setError("Failed to load clubs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Resources</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore learning resources and useful links curated by our clubs
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 animate-pulse opacity-20"></div>
                </div>
                <p className="mt-4 text-slate-600 font-medium">Loading resources...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200">
                  <LinkIcon className="w-8 h-8 text-red-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Unable to Load Resources</h2>
                <p className="text-slate-600 mb-6">{error}</p>
                <button 
                  onClick={fetchClubs}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Try Again
                </button>
              </div>
            ) : clubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clubs.map((club) => (
                  <Link 
                    key={club._id} 
                    href={`/resources/${club.slug}`}
                    className="group block"
                  >
                    <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-slate-200/40 via-transparent to-slate-300/40 hover:from-indigo-300/60 hover:to-slate-400/60 transition-all duration-300">
                      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-6 h-full flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)] transition-all duration-300">
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/5 to-transparent" />

                        {/* Header */}
                        <div className="flex items-start justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-2xl shadow-md ${
                              club.color.includes('blue') ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                              club.color.includes('purple') ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                              club.color.includes('green') ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                              club.color.includes('red') ? 'bg-gradient-to-br from-red-500 to-red-600' :
                              club.color.includes('yellow') ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                              'bg-gradient-to-br from-slate-500 to-slate-600'
                            }`}>
                              <FolderOpen className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-slate-900 tracking-tight truncate">
                                {club.name}
                              </h3>
                              <div className="mt-1">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                                  {club.resourceCount} {club.resourceCount === 1 ? 'resource' : 'resources'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                        </div>

                        {/* Description */}
                        {club.description && (
                          <p className="text-sm text-slate-600 leading-relaxed mt-4 line-clamp-2 relative z-10">
                            {club.description}
                          </p>
                        )}

                        {/* Metadata */}
                        <div className="space-y-2 mt-4 text-xs text-slate-500 relative z-10">
                          <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4" />
                            <span>{club.resourceCount} available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="relative inline-flex">
                  <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-200/40 to-slate-300/40">
                    <div className="p-4 rounded-3xl bg-white/80 backdrop-blur-xl">
                      <FolderOpen className="w-12 h-12 text-slate-400" />
                    </div>
                  </div>
                </div>
                <h2 className="text-lg font-medium text-slate-900 mb-2 mt-6">No Resources Yet</h2>
                <p className="text-slate-600">
                  Check back soon for curated resources from our clubs
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
