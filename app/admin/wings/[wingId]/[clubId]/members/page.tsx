"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Edit,
  Trash2,
  Mail,
  Linkedin,
  Github,
  User,
  X,
  Upload,
  Image
} from "lucide-react";
import Link from "next/link";
import AdminNav from "@/components/adminNav";
import { Loader2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  email: string;
  linkedin: string;
  github: string;
  imgUrl: string;
}

export default function AdminClubMembersPage() {
  const params = useParams();
  const router = useRouter();
  const wingId = params?.wingId as string;
  const clubId = params?.clubId as string;
  
  const [wing, setWing] = useState<any>(null);
  const [club, setClub] = useState<any>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    linkedin: "",
    github: "",
    imgUrl: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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
      
      // Fetch members
      const membersResponse = await fetch(`/api/clubs/${clubId}/members`);
      const membersResult = await membersResponse.json();
      
      if (membersResult.success) {
        console.log('Raw members data from API:', membersResult.data);
        const membersData = membersResult.data.map((member: any) => ({
          id: member._id,
          name: member.name,
          position: member.position,
          email: member.email,
          linkedin: member.linkedin || "",
          github: member.github || "",
          imgUrl: member.imgUrl
        }));
        console.log('Processed members data:', membersData);
        setMembers(membersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    if (!file) return "";

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', `member-${Date.now()}.${file.name.split('.').pop()}`);
      formData.append('folder', '/members');

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imgUrl: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalImgUrl = formData.imgUrl;
    
    // Upload image if there's a new file
    if (imageFile) {
      const uploadedUrl = await handleImageUpload(imageFile);
      if (uploadedUrl) {
        finalImgUrl = uploadedUrl;
      }
    }
    
    const memberData = {
      ...formData,
      imgUrl: finalImgUrl
    };
    
    try {
      if (editingMember) {
        // Update existing member
        const response = await fetch(`/api/members/${editingMember.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          fetchData(); // Refresh the list
        } else {
          console.error('Failed to update member:', result.error);
          alert('Failed to update member: ' + result.error);
        }
      } else {
        // Add new member
        const response = await fetch(`/api/clubs/${clubId}/members`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberData),
        });
        
        const result = await response.json();
        
        if (result.success) {
          fetchData(); // Refresh the list
        } else {
          console.error('Failed to add member:', result.error);
          alert('Failed to add member: ' + result.error);
        }
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member');
    }
    
    // Reset form
    setFormData({
      name: "",
      position: "",
      email: "",
      linkedin: "",
      github: "",
      imgUrl: ""
    });
    setImageFile(null);
    setEditingMember(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      email: member.email,
      linkedin: member.linkedin,
      github: member.github,
      imgUrl: member.imgUrl
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this member?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchData(); // Refresh the list
      } else {
        console.error('Failed to delete member:', result.error);
        alert('Failed to delete member: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member');
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      email: "",
      linkedin: "",
      github: "",
      imgUrl: ""
    });
    setEditingMember(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminNav />
        <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Header Skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" disabled className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="space-y-2">
              <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="h-5 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Members Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-200 rounded-full animate-pulse"></div>
                    <div className="space-y-2 w-full">
                      <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse mx-auto"></div>
                      <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse mx-auto"></div>
                      <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-2 w-full">
                      <div className="h-8 w-1/2 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-8 w-1/2 bg-slate-200 rounded animate-pulse"></div>
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
        <div className="flex flex-col my-4 sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{club.name} Members</h1>
              <p className="text-slate-600 text-lg leading-relaxed">{club.subtitle} - Manage team members</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200" onClick={resetForm}>
                <Plus className="w-5 h-5 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Member" : "Add New Member"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <Label htmlFor="image">Profile Image</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={!imageFile || isUploading}
                      className="flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                  {formData.imgUrl && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <img 
                        src={formData.imgUrl} 
                        alt="Preview" 
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="text-sm text-gray-600">Image preview</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingMember ? "Update Member" : "Add Member"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {members.map((member: TeamMember) => (
          <div key={member.id} className="group block">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-200/40 via-transparent to-slate-300/40 hover:from-indigo-300/60 hover:to-slate-400/60 transition-all duration-300">
              <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-8 h-full flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)] transition-all duration-300">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/5 to-transparent" />

                {/* Top */}
                <div className="flex items-start justify-between relative z-10 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden">
                      {member.imgUrl ? (
                        <img 
                          src={member.imgUrl} 
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover"
                          onError={(e: any) => {
                            console.error('Image failed to load:', member.imgUrl);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.initials-fallback');
                            if (fallback) {
                              fallback.classList.remove('hidden');
                              console.log('Showing initials fallback for:', member.name);
                            }
                          }}
                        />
                      ) : null}
                      <div className={`initials-fallback w-full h-full flex items-center justify-center`} style={{ display: member.imgUrl ? 'none' : 'flex' }}>
                        <span className="text-white font-bold text-lg">
                          {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 tracking-tight mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {member.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(member)}
                      className="h-8 w-8 p-0 hover:bg-slate-100"
                    >
                      <Edit className="w-4 h-4 text-slate-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(member.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Bottom */}
                <div className="space-y-3 relative z-10 mt-auto">
                  {member.email && (
                    <div className="flex items-center text-sm text-slate-500 gap-2">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${member.email}`} className="hover:text-indigo-600 transition-colors">
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.linkedin && (
                    <div className="flex items-center text-sm text-slate-500 gap-2">
                      <Linkedin className="w-4 h-4" />
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                  {member.github && (
                    <div className="flex items-center text-sm text-slate-500 gap-2">
                      <Github className="w-4 h-4" />
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-20">
          <div className="mb-8">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
              <Users className="w-10 h-10 text-slate-400" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">No members found</h3>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
            Get started by adding your first team member
          </p>
        </div>
      )}
    </div>
    </div>
  );
}
