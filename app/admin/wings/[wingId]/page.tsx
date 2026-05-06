"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Mail,
  Upload,
  Edit,
  Settings,
  Trash2,
  Loader2,
  Eye
} from "lucide-react";
import Link from "next/link";
import AdminNav from "@/components/adminNav";
import AppConfig from "@/config/appConfig";

const getClubLogo = (clubId: string) => {
  switch(clubId) {
    // Tatva clubs
    case 'webwiser':
      return AppConfig.imageUrls.WebWiserBox2;
    case 'pixelerate':
      return AppConfig.imageUrls.PixelBox2;
    case 'appistry':
      return AppConfig.imageUrls.AppBox2;
    case 'synapse':
      return AppConfig.imageUrls.SynapseBox2;
    case 'hackshield':
      return AppConfig.imageUrls.HackBox2;
    case 'analytical_arena':
      return AppConfig.imageUrls.ArenaBox2;
    case 'code_red':
      return AppConfig.imageUrls.CodeRedBox2;
    case 'tech_hub':
      return AppConfig.imageUrls.TechHubBox2;
    case 'mech_x':
      return AppConfig.imageUrls.MechXBox2;
    
    // Disha clubs
    // case 'careerCatalyst':
    //   return AppConfig.imageUrls.CareerCatalystBox2;
    // case 'opportune':
    //   return AppConfig.imageUrls.OpportuneBox2;
    
    // Arthniti clubs
    // case 'foundersForge':
    //   return AppConfig.imageUrls.FoundersForgeBox2;
    // case 'freelanthropy':
    //   return AppConfig.imageUrls.FreelanthropyBox2;
    
    // Management clubs
    // case 'creative':
    //   return AppConfig.imageUrls.CreativeBox2;
    // case 'eventManagement': 
    //   return AppConfig.imageUrls.EventManagementBox2;
    // case 'pr':
    //   return AppConfig.imageUrls.PRBox2;
    // case 'sessionWebinar':
    //   return AppConfig.imageUrls.SessionWebinarBox2;
    // case 'sponsor':
    //   return AppConfig.imageUrls.SponsorBox2;
    
    default:
      return AppConfig.imageUrls.homepage.stcLogo;
  }
};

export default function AdminWingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const wingId = params?.wingId as string;
  
  const [wing, setWing] = useState<any>(null);
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [memberCounts, setMemberCounts] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    branch: '',
    description: '',
    whatsappLink: '',
    cardUrl: '',
    message: '',
    order: 0
  });

  useEffect(() => {
    fetchWingData();
  }, [wingId]);

  useEffect(() => {
    if (clubs.length > 0) {
      const fetchAllMemberCounts = async () => {
        const counts: Record<string, number> = {};
        await Promise.all(
          clubs.map(async (club: any) => {
            const count = await fetchClubMemberCount(club.id);
            counts[club.id] = count;
          })
        );
        setMemberCounts(counts);
      };
      fetchAllMemberCounts();
    }
  }, [clubs]);

  const fetchWingData = async () => {
    try {
      setLoading(true);
      
      // Fetch wing data
      const wingResponse = await fetch(`/api/wings/${wingId}`);
      const wingResult = await wingResponse.json();
      
      if (wingResult.success) {
        setWing(wingResult.data);
        setClubs(wingResult.data.clubs || []);
      } else {
        console.error('Failed to fetch wing:', wingResult.error);
      }
    } catch (error) {
      console.error('Error fetching wing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClubMemberCount = async (clubId: string) => {
    try {
      const response = await fetch(`/api/clubs/${clubId}/members`);
      const result = await response.json();
      return result.success ? result.data.length : 0;
    } catch (error) {
      console.error('Error fetching club members:', error);
      return 0;
    }
  };

  // CRUD Handlers
  const handleAddClub = async () => {
    try {
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          wingId: wingId.toLowerCase()
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowAddModal(false);
        setFormData({ id: '', title: '', branch: '', description: '', whatsappLink: '', cardUrl: '', message: '', order: 0 });
        fetchWingData(); // Refresh the list
      } else {
        console.error('Failed to add club:', result.error);
        alert('Failed to add club: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding club:', error);
      alert('Error adding club');
    }
  };

  const handleEditClub = async () => {
    try {
      const response = await fetch(`/api/clubs/${selectedClub.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowEditModal(false);
        setSelectedClub(null);
        setFormData({ id: '', title: '', branch: '', description: '', whatsappLink: '', cardUrl: '', message: '', order: 0 });
        fetchWingData(); // Refresh the list
      } else {
        console.error('Failed to update club:', result.error);
        alert('Failed to update club: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating club:', error);
      alert('Error updating club');
    }
  };

  const handleDeleteClub = async (clubId: string) => {
    if (!confirm('Are you sure you want to delete this club? This will also deactivate all members.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/clubs/${clubId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchWingData(); // Refresh the list
      } else {
        console.error('Failed to delete club:', result.error);
        alert('Failed to delete club: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting club:', error);
      alert('Error deleting club');
    }
  };

  const openEditModal = (club: any) => {
    setSelectedClub(club);
    setFormData({
      id: club.id,
      title: club.title,
      branch: club.branch,
      description: club.description,
      whatsappLink: club.whatsappLink,
      cardUrl: club.cardUrl,
      message: club.message,
      order: club.order
    });
    setShowEditModal(true);
  };

  const getWingDescription = (wingId: string) => {
    switch(wingId) {
      case 'tatva':
        return "Technical wing for innovation and development";
      case 'disha':
        return "Training & Placement Cell - Empowering career development and opportunities";
      case 'arthniti':
        return "Entrepreneurship Cell - Nurturing entrepreneurial spirit and startups";
      default:
        return "Management wing for student development";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminNav />
        <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between ml-4 my-4">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="h-5 w-96 bg-slate-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Clubs Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative rounded-3xl p-[1px] bg-slate-200">
                <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between">
                  {/* Top Skeleton */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-200 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-5 w-32 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-6 w-16 bg-slate-200 rounded-full animate-pulse"></div>
                  </div>

                  {/* Middle Skeleton */}
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                  </div>

                  {/* Bottom Skeleton */}
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!wing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wing Not Found</h1>
            <p className="text-gray-600 mt-1">The requested wing does not exist</p>
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
          <div className="flex items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">{wing.name} Management</h1>
              <p className="text-gray-600 mt-1">{wing.description}</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Club
          </Button>
        </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club) => {
          const memberCount = memberCounts[club.id] || 0;

          return (
            <div key={club.id} className="group block">
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-200/40 via-transparent to-slate-300/40 hover:from-indigo-300/60 hover:to-slate-400/60 transition-all duration-300">
                <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_rgba(79,70,229,0.15)] transition-all duration-300">
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/5 to-transparent" />

                  {/* Top */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md overflow-hidden">
                        <Image 
                          src={getClubLogo(club.id)}
                          alt={`${club.title} Logo`}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                          {club.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {club.branch}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                        {memberCount} members
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openEditModal(club);
                        }}
                        className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                        title="Edit"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteClub(club.id);
                        }}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Middle */}
                  <p className="text-sm text-slate-600 leading-relaxed mt-4 line-clamp-2 relative z-10">
                    {club.description}
                  </p>

                  {/* Bottom */}
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center text-sm text-slate-500 gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{memberCount} team members</span>
                    </div>
                    {club.whatsappLink && (
                      <div className="flex items-center text-sm text-slate-500 gap-1.5">
                        <Mail className="w-4 h-4" />
                        <span>WhatsApp group available</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-2 mt-4">
                      <Link href={`/admin/wings/${wingId}/${club.id}/members`}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full group relative rounded-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm text-slate-700 shadow-[0_4px_12px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(79,70,229,0.12)] hover:bg-slate-50/90 hover:border-slate-300/80 transition-all duration-300 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-slate-100/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            <Users className="w-4 h-4 mr-2" />
                            Manage Members
                          </span>
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href={`/admin/wings/${wingId}/${club.id}/resources`}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full group relative rounded-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm text-slate-700 shadow-[0_4px_12px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)] hover:bg-slate-50/90 hover:border-slate-300/80 transition-all duration-300 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-emerald-50/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <Upload className="w-4 h-4 mr-2" />
                              Resources
                            </span>
                          </Button>
                        </Link>
                        <Link href={`/wings/${wingId}/subclubs/${club.id}`} target="_blank">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full group relative rounded-2xl border-slate-200/60 bg-white/80 backdrop-blur-sm text-slate-700 shadow-[0_4px_12px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(251,146,60,0.12)] hover:bg-slate-50/90 hover:border-slate-300/80 transition-all duration-300 hover:scale-[1.01] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-transparent before:via-amber-50/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <Eye className="w-4 h-4 mr-2" />
                              View Club
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {clubs.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clubs found</h3>
          <p className="text-gray-600">
            Get started by creating your first club
          </p>
        </div>
      )}

      {/* Add Club Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Club</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Club ID</label>
                <Input
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  placeholder="e.g., webwiser"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Club Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., WEBWISER"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Branch</label>
                <Input
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  placeholder="e.g., Web Development Club"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Club description..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Link</label>
                <Input
                  value={formData.whatsappLink}
                  onChange={(e) => setFormData({...formData, whatsappLink: e.target.value})}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Card URL</label>
                <Input
                  value={formData.cardUrl}
                  onChange={(e) => setFormData({...formData, cardUrl: e.target.value})}
                  placeholder="/images/boxes/webwiser-box.jpg"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Club message..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddClub}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add Club
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Club Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Edit Club</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Club Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., WEBWISER"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Branch</label>
                <Input
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  placeholder="e.g., Web Development Club"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Club description..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Link</label>
                <Input
                  value={formData.whatsappLink}
                  onChange={(e) => setFormData({...formData, whatsappLink: e.target.value})}
                  placeholder="https://chat.whatsapp.com/..."
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Card URL</label>
                <Input
                  value={formData.cardUrl}
                  onChange={(e) => setFormData({...formData, cardUrl: e.target.value})}
                  placeholder="/images/boxes/webwiser-box.jpg"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Club message..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Order</label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditClub}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Update Club
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
