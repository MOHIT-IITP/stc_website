"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Plus, 
  Upload, 
  Edit,
  Trash2,
  File,
  FileText,
  Image,
  Video,
  Archive,
  Download,
  Eye,
  Calendar
} from "lucide-react";
import Link from "next/link";
import AdminNav from "@/components/adminNav";
import { Loader2 } from "lucide-react";

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

const resourceTypes = [
  { value: "document", label: "Document", icon: FileText },
  { value: "image", label: "Image", icon: Image },
  { value: "video", label: "Video", icon: Video },
  { value: "archive", label: "Archive", icon: Archive },
  { value: "other", label: "Other", icon: File },
];

const categories = [
  "Study Materials",
  "Projects",
  "Workshops",
  "Competitions",
  "Tutorials",
  "Templates",
  "Documentation",
  "Other"
];

export default function AdminClubResourcesPage() {
  const params = useParams();
  const router = useRouter();
  const wingId = (params?.wingId as string) || '';
  const clubId = (params?.clubId as string) || '';
  
  const [wing, setWing] = useState<any>(null);
  const [club, setClub] = useState<any>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "document" as Resource["type"],
    fileUrl: "",
    fileName: "",
    category: "Study Materials",
    uploadedBy: ""
  });

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!file) return "";

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', `resource-${Date.now()}.${file.name.split('.').pop()}`);
      formData.append('folder', '/resources');

      const response = await fetch('/api/imagekit/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Auto-generate title from filename if title is empty
      if (!formData.title) {
        const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');
        setFormData(prev => ({ ...prev, title: nameWithoutExt }));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [wingId, clubId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch wing data
      const wingResponse = await fetch(`/api/wings/${wingId}`);
      const wingResult = await wingResponse.json();
      
      if (wingResult.success) {
        setWing(wingResult.data);
        
        // Find club in wing data
        const clubData = wingResult.data.clubs?.find((club: any) => club.id === clubId);
        if (clubData) {
          setClub({
            id: clubData.id,
            name: clubData.title,
            subtitle: clubData.branch
          });
        }
      }
      
      // Fetch resources for this club
      const resourcesResponse = await fetch(`/api/resources?clubId=${clubId}`);
      const resourcesResult = await resourcesResponse.json();
      
      if (resourcesResult.success) {
        setResources(resourcesResult.data.resources || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let finalFileUrl = formData.fileUrl;
      let finalFileName = formData.fileName;
      
      // Upload file if there's a new file
      if (imageFile) {
        const uploadedUrl = await handleImageUpload(imageFile);
        if (uploadedUrl) {
          finalFileUrl = uploadedUrl;
          finalFileName = imageFile.name;
        }
      }
      
      const resourceData = {
        clubId: clubId,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        fileUrl: finalFileUrl,
        fileName: finalFileName,
        category: formData.category,
        uploadedBy: formData.uploadedBy || 'Anonymous'
      };
      
      if (editingResource) {
        // Update existing resource
        const response = await fetch(`/api/resources/${editingResource._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resourceData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          fetchData(); // Refresh the list
        } else {
          console.error('Failed to update resource:', result.error);
          alert('Failed to update resource: ' + result.error);
        }
      } else {
        // Add new resource
        const response = await fetch('/api/resources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resourceData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          fetchData(); // Refresh the list
        } else {
          console.error('Failed to create resource:', result.error);
          alert('Failed to create resource: ' + result.error);
        }
      }
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "document",
        fileUrl: "",
        fileName: "",
        category: "Study Materials",
        uploadedBy: ""
      });
      setImageFile(null);
      setEditingResource(null);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error submitting resource:', error);
      alert('Error submitting resource');
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      fileUrl: resource.fileUrl,
      fileName: resource.fileName,
      category: resource.category,
      uploadedBy: resource.uploadedBy
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchData(); // Refresh the list
      } else {
        console.error('Failed to delete resource:', result.error);
        alert('Failed to delete resource: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Error deleting resource');
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "document",
      fileUrl: "",
      fileName: "",
      category: "Study Materials",
      uploadedBy: ""
    });
    setImageFile(null);
    setEditingResource(null);
  };

  const getFileIcon = (type: Resource["type"]) => {
    switch (type) {
      case "document": return FileText;
      case "image": return Image;
      case "video": return Video;
      case "archive": return Archive;
      default: return File;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminNav />
        <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" disabled className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="space-y-2">
                <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="h-5 w-96 bg-slate-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-40 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Search and Filter Skeleton */}
          <div className="flex gap-4 mb-8">
            <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-40 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Resources Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
                      <div className="flex gap-2">
                        <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!wing || !club) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Club Not Found</h1>
            <p className="text-gray-600 mt-1">The requested club does not exist</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between ml-4 my-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mt-4">{club.name} Resources</h1>
            <p className="text-gray-600 mt-1">Manage and upload club resources</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Resource
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? "Edit Resource" : "Upload New Resource"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value: Resource["type"]) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="uploadedBy">Uploaded By</Label>
                <Input
                  id="uploadedBy"
                  value={formData.uploadedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, uploadedBy: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="file">File Upload *</Label>
                <div className="space-y-2">
                  <Input
                    ref={fileInputRef}
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.zip,.rar"
                    className="cursor-pointer"
                  />
                  {imageFile && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <File className="w-4 h-4" />
                      <span>{imageFile.name}</span>
                      <span className="text-slate-400">
                        ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      {editingResource ? "Update Resource" : "Upload Resource"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => {
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(resource)}
                        className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(resource._id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mt-4 line-clamp-2 relative z-10">
                    {resource.description}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 mt-4 text-xs text-slate-500 relative z-10">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4" />
                      <span className="truncate">{resource.fileName} ({resource.fileSize ? (resource.fileSize / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown size'})</span>
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

                  {/* Actions */}
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

      {resources.length === 0 && (
        <div className="text-center py-12">
          <div className="relative inline-flex">
            <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-200/40 to-slate-300/40">
              <div className="p-4 rounded-3xl bg-white/80 backdrop-blur-xl">
                <Upload className="w-12 h-12 text-slate-400" />
              </div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2 mt-6">No resources found</h3>
          <p className="text-slate-600">
            Get started by uploading your first resource
          </p>
        </div>
      )}
    </div>
    </div>
  );
}
