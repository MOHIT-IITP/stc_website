"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Users, 
  Settings, 
  ArrowRight,
  Loader2
} from "lucide-react";
import AdminNav from "@/components/adminNav";
import WingCard from "@/components/admin/WingCard";

export default function AdminWingsPage() {
  const [wings, setWings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWing, setSelectedWing] = useState<any>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    logoUrl: '',
    order: 0
  });

  useEffect(() => {
    fetchWings();
  }, []);

  const fetchWings = async () => {
    try {
      const response = await fetch('/api/wings');
      const result = await response.json();
      
      if (result.success) {
        // Add member counts to wings
        const wingsWithMemberCounts = await Promise.all(
          result.data.map(async (wing: any) => {
            // Get member count for this wing
            const memberCount = await getWingMemberCount(wing.id);
            return {
              ...wing,
              memberCount
            };
          })
        );
        setWings(wingsWithMemberCounts);
      } else {
        console.error('Failed to fetch wings:', result.error);
      }
    } catch (error) {
      console.error('Error fetching wings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWingMemberCount = async (wingId: string) => {
    try {
      const response = await fetch(`/api/wings/${wingId}`);
      const result = await response.json();
      
      if (result.success && result.data.clubs) {
        // Count members across all clubs in this wing
        let totalMembers = 0;
        for (const club of result.data.clubs) {
          const clubResponse = await fetch(`/api/clubs/${club.id}/members`);
          const clubResult = await clubResponse.json();
          if (clubResult.success) {
            totalMembers += clubResult.data.length;
          }
        }
        return totalMembers;
      }
      return 0;
    } catch (error) {
      console.error('Error getting member count:', error);
      return 0;
    }
  };

  // CRUD Handlers
  const handleAddWing = async () => {
    try {
      const response = await fetch('/api/wings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowAddModal(false);
        setFormData({ id: '', name: '', description: '', logoUrl: '', order: 0 });
        fetchWings(); // Refresh the list
      } else {
        console.error('Failed to add wing:', result.error);
        alert('Failed to add wing: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding wing:', error);
      alert('Error adding wing');
    }
  };

  const handleEditWing = async () => {
    try {
      const response = await fetch(`/api/wings/${selectedWing.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowEditModal(false);
        setSelectedWing(null);
        setFormData({ id: '', name: '', description: '', logoUrl: '', order: 0 });
        fetchWings(); // Refresh the list
      } else {
        console.error('Failed to update wing:', result.error);
        alert('Failed to update wing: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating wing:', error);
      alert('Error updating wing');
    }
  };

  const handleDeleteWing = async (wingId: string) => {
    if (!confirm('Are you sure you want to delete this wing? This will also deactivate all associated clubs.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/wings/${wingId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchWings(); // Refresh the list
      } else {
        console.error('Failed to delete wing:', result.error);
        alert('Failed to delete wing: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting wing:', error);
      alert('Error deleting wing');
    }
  };

  const openEditModal = (wing: any) => {
    setSelectedWing(wing);
    setFormData({
      id: wing.id,
      name: wing.name,
      description: wing.description,
      logoUrl: wing.logoUrl,
      order: wing.order
    });
    setShowEditModal(true);
  };

  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminNav />
        <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div className="space-y-2">
              <div className="h-10 w-48 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="h-6 w-64 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Wings Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative rounded-3xl p-[1px] bg-slate-200">
                <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between">
                  {/* Top Skeleton */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-200 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-5 w-24 bg-slate-200 rounded animate-pulse"></div>
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
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-16 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                Wings Management
              </h1>
              <p className="text-slate-600 text-lg mt-1">Manage wings and their associated clubs</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Wing
          </Button>
        </div>

        
        {/* Wings Grid */}
        {wings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wings.map((wing) => (
              <WingCard 
                key={wing.id} 
                wing={wing} 
                basePath="/admin/wings"
                onEdit={openEditModal}
                onDelete={handleDeleteWing}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-lg inline-block">
                <Users className="w-16 h-16 text-slate-400" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">No wings found</h3>
            <p className="text-slate-600 text-lg max-w-md mx-auto">
              No wings are available at the moment
            </p>
          </div>
        )}
      </div>

      {/* Add Wing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Add New Wing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Wing ID</label>
                <Input
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value})}
                  placeholder="e.g., tatva"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Wing Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Tatva"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Wing description..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
                <Input
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                  placeholder="/images/logos/tatva-logo.png"
                  className="w-full"
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
                onClick={handleAddWing}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Add Wing
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Wing Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Edit Wing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Wing Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Tatva"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Wing description..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
                <Input
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                  placeholder="/images/logos/tatva-logo.png"
                  className="w-full"
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
                onClick={handleEditWing}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Update Wing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
