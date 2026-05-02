"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams?.get("callbackUrl") || "/admin"

    useEffect(() => {
        if (session) {
            router.push(callbackUrl)
        }
    }, [session, router, callbackUrl])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid email or password")
            } else {
                router.push(callbackUrl)
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                            <img
                                src="/images/stc-logo.jpg"
                                alt="STC Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-[#0f2a4d]">
                        Admin Login
                    </CardTitle>
                    <CardDescription className="text-[#1a4b8c]">
                        Enter your credentials to access the admin panel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#0f2a4d] font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-gray-300 focus:border-[#0f2a4d] focus:ring-[#0f2a4d]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[#0f2a4d] font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-gray-300 focus:border-[#0f2a4d] focus:ring-[#0f2a4d]"
                            />
                        </div>
                        {error && (
                            <div className="p-3 rounded-md bg-red-50 border border-red-200">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#0f2a4d] hover:bg-[#1a4b8c] text-white font-medium py-2"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-[#0f2a4d]">Loading...</div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
