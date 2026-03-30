"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AdminNav from "@/components/adminNav"
import { UserSession, hasPermission } from "@/lib/permissions"
import { Plus, Edit, Trash2, Search, Shield, Users } from "lucide-react"

interface Role {
  _id: string
  name: string
  description: string
  permissions: string[]
  isActive: boolean
  isSystemRole: boolean
  userCount?: number
  createdAt: string
}

const AVAILABLE_PERMISSIONS = [
  { id: 'dashboard.read', label: 'Dashboard - Read', category: 'Dashboard' },
  
  { id: 'events.read', label: 'Events - Read', category: 'Events' },
  { id: 'events.create', label: 'Events - Create', category: 'Events' },
  { id: 'events.update', label: 'Events - Update', category: 'Events' },
  { id: 'events.delete', label: 'Events - Delete', category: 'Events' },
  
  { id: 'notifications.read', label: 'Notifications - Read', category: 'Notifications' },
  { id: 'notifications.create', label: 'Notifications - Create', category: 'Notifications' },
  { id: 'notifications.update', label: 'Notifications - Update', category: 'Notifications' },
  { id: 'notifications.delete', label: 'Notifications - Delete', category: 'Notifications' },
  
  { id: 'certificates.read', label: 'Certificates - Read', category: 'Certificates' },
  { id: 'certificates.create', label: 'Certificates - Create', category: 'Certificates' },
  { id: 'certificates.update', label: 'Certificates - Update', category: 'Certificates' },
  { id: 'certificates.delete', label: 'Certificates - Delete', category: 'Certificates' },
  
  { id: 'registrations.read', label: 'Registrations - Read', category: 'Registrations' },
  { id: 'registrations.create', label: 'Registrations - Create', category: 'Registrations' },
  { id: 'registrations.update', label: 'Registrations - Update', category: 'Registrations' },
  { id: 'registrations.delete', label: 'Registrations - Delete', category: 'Registrations' },
  
  { id: 'competitions.read', label: 'Competitions - Read', category: 'Competitions' },
  { id: 'competitions.create', label: 'Competitions - Create', category: 'Competitions' },
  { id: 'competitions.update', label: 'Competitions - Update', category: 'Competitions' },
  { id: 'competitions.delete', label: 'Competitions - Delete', category: 'Competitions' },
  
  { id: 'users.read', label: 'Users - Read', category: 'User Management' },
  { id: 'users.create', label: 'Users - Create', category: 'User Management' },
  { id: 'users.update', label: 'Users - Update', category: 'User Management' },
  { id: 'users.delete', label: 'Users - Delete', category: 'User Management' },
  
  { id: 'roles.read', label: 'Roles - Read', category: 'Role Management' },
  { id: 'roles.create', label: 'Roles - Create', category: 'Role Management' },
  { id: 'roles.update', label: 'Roles - Update', category: 'Role Management' },
  { id: 'roles.delete', label: 'Roles - Delete', category: 'Role Management' },
]

const PERMISSION_CATEGORIES = [...new Set(AVAILABLE_PERMISSIONS.map(p => p.category))]

export default function RolesPage() {
  const { data: session } = useSession() as { data: UserSession | null }
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
    isActive: true
  })

  // Check permissions
  const canCreate = hasPermission(session, 'roles.create')
  const canUpdate = hasPermission(session, 'roles.update')
  const canDelete = hasPermission(session, 'roles.delete')

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      
      const response = await fetch(`/api/admin/roles?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setRoles(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingRole ? `/api/admin/roles?id=${editingRole._id}` : '/api/admin/roles'
      const method = editingRole ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (data.success) {
        setShowCreateForm(false)
        setEditingRole(null)
        resetForm()
        fetchRoles()
        alert(`Role ${editingRole ? 'updated' : 'created'} successfully!`)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert('Failed to save role')
    }
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
      isActive: role.isActive
    })
    setShowCreateForm(true)
  }

  const handleDelete = async (roleId: string, roleName: string) => {
    if (!confirm(`Are you sure you want to delete role "${roleName}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/roles?id=${roleId}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      
      if (data.success) {
        fetchRoles()
        alert('Role deleted successfully!')
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert('Failed to delete role')
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
      isActive: true
    })
    setEditingRole(null)
  }

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const toggleCategoryPermissions = (category: string) => {
    const categoryPermissions = AVAILABLE_PERMISSIONS
      .filter(p => p.category === category)
      .map(p => p.id)
    
    const allSelected = categoryPermissions.every(p => formData.permissions.includes(p))
    
    if (allSelected) {
      // Remove all category permissions
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !categoryPermissions.includes(p))
      }))
    } else {
      // Add all category permissions
      setFormData(prev => ({
        ...prev,
        permissions: [...new Set([...prev.permissions, ...categoryPermissions])]
      }))
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [searchTerm])

  if (!hasPermission(session, 'roles.read')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="pt-24 px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to view roles.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      <div className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Role Management</h1>
              <p className="text-gray-600 mt-1">Manage roles and permissions</p>
            </div>
            
            {canCreate && (
              <Button 
                onClick={() => {
                  resetForm()
                  setShowCreateForm(true)
                }}
                className="mt-4 sm:mt-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            )}
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="max-w-md">
                <Label htmlFor="search">Search Roles</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create/Edit Form */}
          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Role Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={editingRole?.isSystemRole}
                      />
                      {editingRole?.isSystemRole && (
                        <p className="text-sm text-gray-500 mt-1">System role names cannot be changed</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-6">
                      <input
                        id="isActive"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        disabled={editingRole?.isSystemRole && !formData.isActive}
                      />
                      <Label htmlFor="isActive">Active Role</Label>
                      {editingRole?.isSystemRole && (
                        <p className="text-sm text-gray-500">System roles cannot be deactivated</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe this role's purpose and responsibilities"
                      rows={3}
                    />
                  </div>

                  {/* Permissions */}
                  <div>
                    <Label>Permissions ({formData.permissions.length} selected)</Label>
                    <div className="space-y-4 mt-4">
                      {PERMISSION_CATEGORIES.map(category => {
                        const categoryPermissions = AVAILABLE_PERMISSIONS.filter(p => p.category === category)
                        const selectedCount = categoryPermissions.filter(p => formData.permissions.includes(p.id)).length
                        const allSelected = selectedCount === categoryPermissions.length
                        const someSelected = selectedCount > 0 && selectedCount < categoryPermissions.length

                        return (
                          <div key={category} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-gray-500" />
                                <h3 className="font-medium text-gray-900">{category}</h3>
                                <span className="text-sm text-gray-500">
                                  ({selectedCount}/{categoryPermissions.length})
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => toggleCategoryPermissions(category)}
                                className={someSelected ? 'border-blue-500 text-blue-600' : ''}
                              >
                                {allSelected ? 'Deselect All' : 'Select All'}
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {categoryPermissions.map(permission => (
                                <label
                                  key={permission.id}
                                  className="flex items-center space-x-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded"
                                >
                                  <input
                                    type="checkbox"
                                    checked={formData.permissions.includes(permission.id)}
                                    onChange={() => togglePermission(permission.id)}
                                    className="rounded"
                                  />
                                  <span>{permission.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit">
                      {editingRole ? 'Update Role' : 'Create Role'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Roles List */}
          <Card>
            <CardHeader>
              <CardTitle>Roles ({roles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading roles...</div>
              ) : roles.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No roles found</div>
              ) : (
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role._id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                            
                            <div className="flex space-x-2">
                              {role.isSystemRole && (
                                <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                  System Role
                                </span>
                              )}
                              
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                role.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {role.isActive ? 'Active' : 'Inactive'}
                              </span>
                              
                              {role.userCount !== undefined && (
                                <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                                  <Users className="w-3 h-3 mr-1" />
                                  {role.userCount} users
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mt-1">{role.description}</p>
                          
                          <div className="mt-3">
                            <span className="text-sm text-gray-500">
                              Permissions: {role.permissions.length}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {role.permissions.slice(0, 5).map(permission => (
                                <span key={permission} className="inline-flex px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                                  {permission}
                                </span>
                              ))}
                              {role.permissions.length > 5 && (
                                <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                  +{role.permissions.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {((canUpdate && (!role.isSystemRole || role.isSystemRole)) || (canDelete && !role.isSystemRole)) && (
                          <div className="flex space-x-2">
                            {canUpdate && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(role)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            {canDelete && !role.isSystemRole && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(role._id, role.name)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}