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
import { Plus, Trash2, Edit, Loader2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Club {
  _id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

const COLOR_OPTIONS = [
  { value: "from-blue-600 to-blue-800", label: "Blue" },
  { value: "from-green-600 to-green-800", label: "Green" },
  { value: "from-purple-600 to-purple-800", label: "Purple" },
  { value: "from-orange-600 to-orange-800", label: "Orange" },
  { value: "from-pink-600 to-pink-800", label: "Pink" },
  { value: "from-indigo-600 to-indigo-800", label: "Indigo" },
  { value: "from-rose-600 to-rose-800", label: "Rose" },
  { value: "from-teal-600 to-teal-800", label: "Teal" },
  { value: "from-cyan-600 to-cyan-800", label: "Cyan" },
  { value: "from-amber-600 to-amber-800", label: "Amber" },
];

export default function AdminClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "from-blue-600 to-blue-800",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/admin/clubs");
      const data = await response.json();
      if (data.success) {
        setClubs(data.data);
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
      toast({ title: "Error", description: "Failed to fetch clubs", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (value: string) => {
    setFormData({
      ...formData,
      name: value,
      slug: editingClub ? formData.slug : generateSlug(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = "/api/admin/clubs";
      const method = editingClub ? "PUT" : "POST";
      const body = editingClub ? { id: editingClub._id, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        toast({ title: "Success", description: `Club ${editingClub ? "updated" : "created"} successfully` });
        setDialogOpen(false);
        resetForm();
        fetchClubs();
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error saving club:", error);
      toast({ title: "Error", description: "Failed to save club", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (club: Club) => {
    if (!confirm(`Are you sure you want to delete "${club.name}"?`)) return;

    try {
      const response = await fetch(`/api/admin/clubs?id=${club._id}`, { method: "DELETE" });
      const data = await response.json();

      if (data.success) {
        toast({ title: "Success", description: "Club deleted successfully" });
        fetchClubs();
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error deleting club:", error);
      toast({ title: "Error", description: "Failed to delete club", variant: "destructive" });
    }
  };

  const handleEdit = (club: Club) => {
    setEditingClub(club);
    setFormData({
      name: club.name,
      slug: club.slug,
      description: club.description || "",
      color: club.color,
      order: club.order,
      isActive: club.isActive,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "from-blue-600 to-blue-800",
      order: 0,
      isActive: true,
    });
    setEditingClub(null);
  };

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#0f2a4d] mb-2">Manage Clubs</h1>
              <p className="text-lg text-[#1a4b8c]">Create and manage clubs for resources</p>
            </div>
            <Button
              onClick={() => { resetForm(); setDialogOpen(true); }}
              className="bg-[#0f2a4d] hover:bg-[#1a4b8c]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Club
            </Button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#0f2a4d]" />
              </div>
            ) : clubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                  <Card key={club._id} className={`overflow-hidden hover:shadow-xl transition-shadow ${!club.isActive ? 'opacity-50' : ''}`}>
                    <div className={`h-2 bg-gradient-to-r ${club.color}`} />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${club.color} flex items-center justify-center`}>
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#0f2a4d]">{club.name}</h3>
                          <p className="text-xs text-gray-500">/{club.slug}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {club.description || "No description"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded ${club.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {club.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span>Order: {club.order}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 p-4 flex gap-2">
                      <Button onClick={() => handleEdit(club)} variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(club)} variant="destructive" size="sm" className="flex-1">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Clubs Yet</h3>
                <p className="text-gray-600 mb-4">Create your first club to start adding resources</p>
                <Button onClick={() => { resetForm(); setDialogOpen(true); }} className="bg-[#0f2a4d] hover:bg-[#1a4b8c]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Club
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingClub ? "Edit Club" : "Add New Club"}</DialogTitle>
            <DialogDescription>
              {editingClub ? "Update club details" : "Create a new club for organizing resources"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Club Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. WebWiser"
                required
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug *</Label>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">/resources/</span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                  placeholder="hackshield"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the club"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">Color Theme</Label>
                <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COLOR_OPTIONS.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded bg-gradient-to-r ${color.value}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                />
              </div>
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
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting} className="bg-[#0f2a4d] hover:bg-[#1a4b8c]">
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : (editingClub ? "Update" : "Create")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
