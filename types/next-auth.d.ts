import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name: string
    email: string
    role: {
      id: string
      name: string
      permissions: string[]
    }
  }

  interface Session {
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
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    role: {
      id: string
      name: string
      permissions: string[]
    }
    permissions: string[]
  }
}