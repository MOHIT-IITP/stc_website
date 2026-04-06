export type Permission = 
  // Dashboard 
  | 'dashboard.read'
  // Events   
  | 'events.read' | 'events.create' | 'events.update' | 'events.delete'
  // Notifications 
  | 'notifications.read' | 'notifications.create' | 'notifications.update' | 'notifications.delete'
  // Certificates 
  | 'certificates.read' | 'certificates.create' | 'certificates.update' | 'certificates.delete'
  // Registration 
  | 'registrations.read' | 'registrations.create' | 'registrations.update' | 'registrations.delete'
  // Competition 
  | 'competitions.read' | 'competitions.create' | 'competitions.update' | 'competitions.delete'
  // User 
  | 'users.read' | 'users.create' | 'users.update' | 'users.delete'
  // Role 
  | 'roles.read' | 'roles.create' | 'roles.update' | 'roles.delete'
  // Resources
  | 'resources.read' | 'resources.create' | 'resources.update' | 'resources.delete'
  // Clubs
  | 'clubs.read' | 'clubs.create' | 'clubs.update' | 'clubs.delete'

export interface UserSession {
  user: {
    id: string
    name: string
    email: string
    role: {
      id: string
      name: string
      permissions: string[]
    }
    permissions: string[]
  }
}

export function hasPermission(session: UserSession | null, permission: Permission): boolean {
  if (!session?.user?.permissions) {
    return false
  }
  return session.user.permissions.includes(permission)
}

export function hasAnyPermission(session: UserSession | null, permissions: Permission[]): boolean {
  if (!session?.user?.permissions) {
    return false
  }
  return permissions.some(permission => session.user.permissions.includes(permission))
}

export function hasAllPermissions(session: UserSession | null, permissions: Permission[]): boolean {
  if (!session?.user?.permissions) {
    return false
  }
  return permissions.every(permission => session.user.permissions.includes(permission))
}

export function getResourcePermissions(session: UserSession | null, resource: string): Permission[] {
  if (!session?.user?.permissions) {
    return []
  }
  
  return session.user.permissions.filter(permission => 
    permission.startsWith(resource + '.')
  ) as Permission[]
}

export function canRead(session: UserSession | null, resource: string): boolean {
  return hasPermission(session, `${resource}.read` as Permission)
}

export function canCreate(session: UserSession | null, resource: string): boolean {
  return hasPermission(session, `${resource}.create` as Permission)
}

export function canUpdate(session: UserSession | null, resource: string): boolean {
  return hasPermission(session, `${resource}.update` as Permission)
}

export function canDelete(session: UserSession | null, resource: string): boolean {
  return hasPermission(session, `${resource}.delete` as Permission)
}

export function getResourceCRUDPermissions(session: UserSession | null, resource: string) {
  return {
    read: canRead(session, resource),
    create: canCreate(session, resource),
    update: canUpdate(session, resource),
    delete: canDelete(session, resource)
  }
}

export function isSuperAdmin(session: UserSession | null): boolean {
  return session?.user?.role?.name === 'Super Admin'
}

export function isAdmin(session: UserSession | null): boolean {
  const roleName = session?.user?.role?.name
  return roleName === 'Super Admin' || roleName === 'Admin'
}

export function getUserRole(session: UserSession | null): string | null {
  return session?.user?.role?.name || null
}

export function getNavigationPermissions(session: UserSession | null) {
  if (!session) {
    return {
      dashboard: false,
      events: false,
      notifications: false,
      certificates: false,
      registrations: false,
      competitions: false,
      users: false,
      roles: false,
      resources: false,
      clubs: false
    }
  }

  return {
    dashboard: hasPermission(session, 'dashboard.read'),
    events: hasAnyPermission(session, ['events.read', 'events.create', 'events.update', 'events.delete']),
    notifications: hasAnyPermission(session, ['notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete']),
    certificates: hasAnyPermission(session, ['certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete']),
    registrations: hasAnyPermission(session, ['registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete']),
    competitions: hasAnyPermission(session, ['competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete']),
    users: hasAnyPermission(session, ['users.read', 'users.create', 'users.update', 'users.delete']),
    roles: hasAnyPermission(session, ['roles.read', 'roles.create', 'roles.update', 'roles.delete']),
    resources: hasAnyPermission(session, ['resources.read', 'resources.create', 'resources.update', 'resources.delete']),
    clubs: hasAnyPermission(session, ['clubs.read', 'clubs.create', 'clubs.update', 'clubs.delete'])
  }
}

export function checkPermission(session: UserSession | null, permission: Permission): boolean {
  return hasPermission(session, permission)
}

export function checkAnyPermission(session: UserSession | null, permissions: Permission[]): boolean {
  return hasAnyPermission(session, permissions)
}

export function permissionDeniedResponse(permission?: string) {
  return {
    success: false,
    error: 'Insufficient permissions',
    message: permission 
      ? `You do not have permission to perform this action. Required: ${permission}`
      : 'You do not have permission to perform this action.'
  }
}
