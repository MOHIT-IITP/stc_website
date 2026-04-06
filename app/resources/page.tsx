"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { Loader2, FolderOpen, ChevronRight, Link as LinkIcon } from "lucide-react";

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
        setClubs(data.data);
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
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Explore learning resources and useful links curated by our clubs
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={fetchClubs}
                  className="text-blue-600 hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : clubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                  <Link 
                    key={club._id} 
                    href={`/resources/${club.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                      {/* Color header */}
                      <div className={`h-32 bg-gradient-to-r ${club.color} p-6 flex items-end`}>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <FolderOpen className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-bold text-[#0f2a4d] group-hover:text-blue-600 transition-colors">
                            {club.name}
                          </h2>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        
                        {club.description && (
                          <p className="text-gray-600 mt-2 line-clamp-2">{club.description}</p>
                        )}
                        
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                          <LinkIcon className="h-4 w-4" />
                          <span>{club.resourceCount} {club.resourceCount === 1 ? 'resource' : 'resources'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FolderOpen className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Resources Yet</h2>
                <p className="text-gray-600">Check back soon for curated resources from our clubs</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
