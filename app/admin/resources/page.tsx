"use client";

import { useState, useEffect } from "react";
import AdminNav from "@/components/adminNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Edit, Loader2, Link as LinkIcon, ExternalLink, FolderOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Club {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface Resource {
  _id: string;
  title: string;
  description: string;
  url: string;
  clubId: Club;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [filterClub, setFilterClub] = useState<string>("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    clubId: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchClubs();
    fetchResources();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/admin/clubs");
      const data = await response.json();
      if (data.success) {
        setClubs(data.data);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/admin/resources");
      const data = await response.json();
      if (data.success) {
        setResources(data.data);
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast({ title: "Error", description: "Failed to fetch resources", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = "/api/admin/resources";
      const method = editingResource ? "PUT" : "POST";
      const body = editingResource ? { id: editingResource._id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: "Success", description: `Resource ${editingResource ? "updated" : "created"} successfully` });
        setDialogOpen(false);
        resetForm();
        fetchResources();
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error saving resource:", error);
      toast({ title: "Error", description: "Failed to save resource", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (resource: Resource) => {
    if (!confirm(`Are you sure you want to delete "${resource.title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/resources?id=${resource._id}`, { method: "DELETE" });
      const data = await response.json();

      if (data.success) {
        toast({ title: "Success", description: "Resource deleted successfully" });
        fetchResources();
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast({ title: "Error", description: "Failed to delete resource", variant: "destructive" });
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description || "",
      url: resource.url,
      clubId: resource.clubId._id,
      order: resource.order,
      isActive: resource.isActive,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      url: "",
      clubId: clubs.length > 0 ? clubs[0]._id : "",
      order: 0,
      isActive: true,
    });
    setEditingResource(null);
  };

  const filteredResources = filterClub === "all" 
    ? resources 
    : resources.filter(r => r.clubId?._id === filterClub);

  // Group resources by club
  const groupedResources = filteredResources.reduce((acc, resource) => {
    const clubId = resource.clubId?._id || "uncategorized";
    if (!acc[clubId]) {
      acc[clubId] = {
        club: resource.clubId || { _id: "uncategorized", name: "Uncategorized", slug: "", color: "from-gray-600 to-gray-800" },
        resources: []
      };
    }
    acc[clubId].resources.push(resource);
    return acc;
  }, {} as Record<string, { club: Club; resources: Resource[] }>);

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#0f2a4d] mb-2">Manage Resources</h1>
              <p className="text-lg text-[#1a4b8c]">Add and manage resource links for clubs</p>
            </div>
            <div className="flex gap-3">
              <Select value={filterClub} onValueChange={setFilterClub}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by club" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clubs</SelectItem>
                  {clubs.map((club) => (
                    <SelectItem key={club._id} value={club._id}>{club.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => { resetForm(); setDialogOpen(true); }}
                className="bg-[#0f2a4d] hover:bg-[#1a4b8c]"
                disabled={clubs.length === 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </div>
          </div>

          {/* Warning if no clubs */}
          {clubs.length === 0 && !loading && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-amber-800">
                <strong>Note:</strong> You need to create clubs first before adding resources.{" "}
                <a href="/admin/clubs" className="underline hover:no-underline">Go to Clubs →</a>
              </p>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#0f2a4d]" />
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="space-y-8">
                {Object.values(groupedResources).map(({ club, resources }) => (
                  <div key={club._id}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${club.color} flex items-center justify-center`}>
                        <FolderOpen className="h-4 w-4 text-white" />
                      </div>
                      <h2 className="text-xl font-semibold text-[#0f2a4d]">{club.name}</h2>
                      <span className="text-sm text-gray-500">({resources.length} resources)</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resources.map((resource) => (
                        <Card key={resource._id} className={`overflow-hidden hover:shadow-lg transition-shadow ${!resource.isActive ? 'opacity-50' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${club.color} flex items-center justify-center flex-shrink-0`}>
                                <LinkIcon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[#0f2a4d] truncate">{resource.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{resource.description || "No description"}</p>
                                <a 
                                  href={resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  Open Link
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                              <span className={`px-2 py-0.5 rounded ${resource.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {resource.isActive ? 'Active' : 'Inactive'}
                              </span>
                              <span>Order: {resource.order}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 p-3 flex gap-2">
                            <Button onClick={() => handleEdit(resource)} variant="outline" size="sm" className="flex-1">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button onClick={() => handleDelete(resource)} variant="destructive" size="sm" className="flex-1">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <LinkIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Resources Yet</h3>
                <p className="text-gray-600 mb-4">
                  {clubs.length === 0 ? "Create clubs first to add resources" : "Add your first resource link"}
                </p>
                {clubs.length > 0 && (
                  <Button onClick={() => { resetForm(); setDialogOpen(true); }} className="bg-[#0f2a4d] hover:bg-[#1a4b8c]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Resource
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
            <DialogDescription>
              {editingResource ? "Update resource details" : "Add a new resource link"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Web Development Fundamentals"
                required
              />
            </div>
            <div>
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com/resource"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the resource"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="clubId">Club *</Label>
              <Select value={formData.clubId} onValueChange={(value) => setFormData({ ...formData, clubId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club._id} value={club._id}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded bg-gradient-to-r ${club.color}`} />
                        {club.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="isActive">Status</Label>
                <Select value={formData.isActive.toString()} onValueChange={(value) => setFormData({ ...formData, isActive: value === "true" })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting} className="bg-[#0f2a4d] hover:bg-[#1a4b8c]">
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : (editingResource ? "Update" : "Create")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
