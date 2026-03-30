import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import connectDB from "./connectdb"
import User from "../schema/UserSchema"
import Role from "../schema/RoleSchema"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          await connectDB()
          
          const user = await User.findOne({ 
            email: credentials.email,
            isActive: true 
          }).populate({
            path: 'roleId',
            model: Role,
            select: 'name permissions isActive'
          })

          if (!user || !user.roleId || !user.roleId.isActive) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword)
          if (!isPasswordValid) {
            return null
          }

          await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() })

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: {
              id: user.roleId._id.toString(),
              name: user.roleId.name,
              permissions: user.roleId.permissions
            }
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
        token.role = user.role
        token.permissions = user.role.permissions
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.userId as string
        session.user.role = token.role as {
          id: string
          name: string
          permissions: string[]
        }
        session.user.permissions = token.permissions as string[]
      }
      return session
    },
  },
}

export const getAuthSession = async () => {
  const { getServerSession } = await import('next-auth')
  return getServerSession(authOptions)
}
