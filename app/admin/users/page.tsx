"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminNav from "@/components/adminNav"
import { UserSession, hasPermission } from "@/lib/permissions"
import { Eye, EyeOff, Plus, Edit, Trash2, Search } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  isActive: boolean
  roleId: {
    _id: string
    name: string
    description: string
  }
  createdAt: string
  lastLoginAt?: string
}

interface Role {
  _id: string
  name: string
  description: string
  isActive: boolean
}

export default function UsersPage() {
  const { data: session } = useSession() as { data: UserSession | null }
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
    isActive: true
  })

  // Check permissions
  const canCreate = hasPermission(session, 'users.create')
  const canUpdate = hasPermission(session, 'users.update')
  const canDelete = hasPermission(session, 'users.delete')

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      if (selectedRole && selectedRole !== 'all') params.set('roleId', selectedRole)
      
      const response = await fetch(`/api/admin/users?${params.toString()}`)
      const data = await response.json()
      
      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles?includeAll=true')
      const data = await response.json()
      
      if (data.success) {
        setRoles(data.data.filter((role: Role) => role.isActive))
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingUser ? `/api/admin/users?id=${editingUser._id}` : '/api/admin/users'
      const method = editingUser ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      
      if (data.success) {
        setShowCreateForm(false)
        setEditingUser(null)
        resetForm()
        fetchUsers()
        alert(`User ${editingUser ? 'updated' : 'created'} successfully!`)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert('Failed to save user')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      roleId: user.roleId._id,
      isActive: user.isActive
    })
    setShowCreateForm(true)
  }

  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      
      if (data.success) {
        fetchUsers()
        alert('User deleted successfully!')
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      roleId: "",
      isActive: true
    })
    setEditingUser(null)
    setShowPassword(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [searchTerm, selectedRole])

  if (!hasPermission(session, 'users.read')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <div className="pt-24 px-4">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to view users.</p>
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
              <h1 className="text-3xl font-semibold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
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
                Add User
              </Button>
            )}
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="search">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="role-filter">Filter by Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role._id} value={role._id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create/Edit Form */}
          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{editingUser ? 'Edit User' : 'Create New User'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="password">
                        {editingUser ? 'New Password (leave empty to keep current)' : 'Password'}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required={!editingUser}
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select value={formData.roleId} onValueChange={(value) => setFormData({...formData, roleId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role._id} value={role._id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      id="isActive"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <Label htmlFor="isActive">Active User</Label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit">
                      {editingUser ? 'Update User' : 'Create User'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : users.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No users found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Name</th>
                        <th className="text-left py-2">Email</th>
                        <th className="text-left py-2">Role</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Last Login</th>
                        {(canUpdate || canDelete) && <th className="text-left py-2">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id} className="border-b">
                          <td className="py-3">{user.name}</td>
                          <td className="py-3">{user.email}</td>
                          <td className="py-3">
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {user.roleId.name}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-600">
                            {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                          </td>
                          {(canUpdate || canDelete) && (
                            <td className="py-3">
                              <div className="flex space-x-2">
                                {canUpdate && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEdit(user)}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                                {canDelete && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(user._id, user.name)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}