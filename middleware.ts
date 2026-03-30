import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl
        const token = req.nextauth.token

        if (pathname === '/admin') {
            return NextResponse.next()
        }

        const permissions = token?.permissions as string[] || []

        const routePermissions: Record<string, string[]> = {
            '/admin/events': ['events.read', 'events.create', 'events.update', 'events.delete'],
            '/admin/notifications': ['notifications.read', 'notifications.create', 'notifications.update', 'notifications.delete'],
            '/admin/certificates': ['certificates.read', 'certificates.create', 'certificates.update', 'certificates.delete'],
            '/admin/registration': ['registrations.read', 'registrations.create', 'registrations.update', 'registrations.delete'],
            '/admin/competitions': ['competitions.read', 'competitions.create', 'competitions.update', 'competitions.delete'],
            '/admin/users': ['users.read', 'users.create', 'users.update', 'users.delete'],
            '/admin/roles': ['roles.read', 'roles.create', 'roles.update', 'roles.delete'],
        }

        const requiredPermissions = routePermissions[pathname]
        if (requiredPermissions) {
            const hasPermission = requiredPermissions.some(permission => 
                permissions.includes(permission)
            )
            
            if (!hasPermission) {
                const url = req.nextUrl.clone()
                url.pathname = '/admin'
                url.searchParams.set('error', 'insufficient_permissions')
                return NextResponse.redirect(url)
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token
            },
        },
        pages: {
            signIn: '/login',
        },
    }
)

export const config = {
    matcher: ['/admin/:path*']
}
