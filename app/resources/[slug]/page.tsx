"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { Loader2, ArrowLeft, ExternalLink, Link as LinkIcon, FolderOpen, FileText, Image, Video, Archive, Calendar, Upload, Download, Eye } from "lucide-react";

interface Resource {
  _id: string;
  clubId: string;
  title: string;
  description: string;
  type: "document" | "image" | "video" | "archive" | "other";
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  category: string;
  tags: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

const getFileIcon = (type: Resource["type"]) => {
  switch (type) {
    case "document": return FileText;
    case "image": return Image;
    case "video": return Video;
    case "archive": return Archive;
    default: return FileText;
  }
};

export default function ClubResourcesPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
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
      const response = await fetch(`/api/resources?clubId=${slug}`);
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
        <div className="min-h-screen bg-white pt-16">
          {/* Skeleton Header */}
          <div className="border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  <div>
                    <div className="w-32 h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton Resources */}
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative rounded-2xl p-[1px] bg-gray-100">
                  <div className="relative rounded-2xl bg-white/90 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="w-32 h-5 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="w-1/2 h-3 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
      <div className="min-h-screen bg-white pt-16">
        {/* Premium Header */}
        <div className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <Link 
                href="/resources"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back</span>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                  <FolderOpen className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{club.name}</h1>
                  <p className="text-gray-600">{resources.length} resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Resources Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => {
                const FileIcon = getFileIcon(resource.type);
                return (
                  <div key={resource._id} className="group block">
                    <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-slate-200/40 via-transparent to-slate-300/40 hover:from-indigo-300/60 hover:to-slate-400/60 transition-all duration-300">
                      <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-6 h-full flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)] transition-all duration-300">
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/5 to-transparent" />

                        {/* Header */}
                        <div className="flex items-start justify-between relative z-10">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-2xl shadow-md ${
                              resource.type === 'document' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                              resource.type === 'image' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                              resource.type === 'video' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                              resource.type === 'archive' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                              'bg-gradient-to-br from-slate-500 to-slate-600'
                            }`}>
                              <FileIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-slate-900 tracking-tight truncate">
                                {resource.title}
                              </h3>
                              <div className="mt-1">
                                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600">
                                  {resource.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-slate-600 leading-relaxed mt-4 line-clamp-2 relative z-10">
                          {resource.description}
                        </p>

                        {/* Metadata */}
                        <div className="space-y-2 mt-4 text-xs text-slate-500 relative z-10">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="truncate">{resource.fileName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            <span>{resource.uploadedBy}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 mt-4 relative z-10">
                          <a 
                            href={resource.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="relative overflow-hidden rounded-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm text-slate-700 shadow-[0_4px_12px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(79,70,229,0.12)] hover:bg-slate-50/90 hover:border-slate-300/80 transition-all duration-300 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-slate-100/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 flex items-center justify-center px-3 py-2 text-sm font-medium"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </span>
                          </a>
                          <a 
                            href={resource.fileUrl} 
                            download={resource.fileName}
                            className="relative overflow-hidden rounded-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm text-slate-700 shadow-[0_4px_12px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)] hover:bg-slate-50/90 hover:border-slate-300/80 transition-all duration-300 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-emerald-50/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 flex items-center justify-center px-3 py-2 text-sm font-medium"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <LinkIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">No Resources Yet</h2>
              <p className="text-sm text-gray-600">This club hasn't added any resources yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
