"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { Loader2, ArrowLeft, ExternalLink, Link as LinkIcon, FolderOpen } from "lucide-react";

interface Resource {
  _id: string;
  title: string;
  description: string;
  url: string;
  order: number;
}

interface Club {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface ClubData {
  club: Club;
  resources: Resource[];
}

export default function ClubResourcesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<ClubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchClubResources();
    }
  }, [slug]);

  const fetchClubResources = async () => {
    try {
      const response = await fetch(`/api/resources?slug=${slug}`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to load resources");
      }
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <FolderOpen className="h-20 w-20 mx-auto mb-4 text-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Club Not Found</h1>
            <p className="text-gray-600 mb-4">{error || "The requested club does not exist"}</p>
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { club, resources } = data;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className={`relative bg-gradient-to-r ${club.color} text-white pt-32 pb-20`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Link 
              href="/resources"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all clubs
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FolderOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{club.name}</h1>
                {club.description && (
                  <p className="text-xl text-white/80 mt-2">{club.description}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {resources.length > 0 ? (
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <a
                    key={resource._id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 p-6">
                      {/* Index number with color */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${club.color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#0f2a4d] group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </h3>
                        {resource.description && (
                          <p className="text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                        )}
                      </div>
                      
                      {/* Arrow icon */}
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <LinkIcon className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Resources Yet</h2>
                <p className="text-gray-600">This club hasn&apos;t added any resources yet. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

      </div>
    </>
  );
}
