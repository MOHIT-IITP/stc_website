'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from 'react'
import { signOut } from "next-auth/react";
import { Menu, X } from "lucide-react"


const theme = {
    bg: 'bg-gray-100',
    accent: 'blue',
    border: 'border-gray-200',
    hover: 'hover:bg-blue-100',
    active: 'bg-blue-200',
    text: 'text-gray-900',
    navText: 'text-gray-800 hover:text-gray-900',
    navHover: 'hover:bg-blue-50',
    navActive: 'bg-blue-100 text-gray-900 font-medium',
    navBg: 'bg-white/90 backdrop-blur-sm shadow-sm'
}


const navItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Events", href: "/admin/events" },
    { label: "Notifications", href: "/admin/notifications" },
    { label: "Registration", href: "/admin/registration" },
    { label: "Competitions", href: "/admin/competitions" },
    { label: "Certificates", href: "/admin/certificates" },
];

const AdminNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false)
    const isAdmin = pathname?.startsWith('/admin')
    if (!isAdmin) return null
    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${theme.navBg} py-4 border-b ${theme.border}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-200 shadow-lg">
                            <img
                                src="/images/stc-logo.jpg"
                                alt="STC Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="hidden sm:flex flex-col justify-center">
                            <h1 className="text-lg font-bold text-[#0f2a4d] group-hover:text-[#1a4b8c] transition-colors leading-tight">
                                STC Admin Panel
                            </h1>
                            <p className="text-xs text-[#1a4b8c] font-medium leading-tight">IIT Patna</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <div key={item.href} className="relative flex items-center">
                                <Link
                                    href={item.href}
                                    className={`relative px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${(item.href === '/' ? pathname === '/' : pathname === item.href)
                                        ? `${theme.navActive} font-semibold`
                                        : `${theme.navText} ${theme.navHover}`
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                        <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200" onClick={() => signOut({ callbackUrl: '/' })}>
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className={`px-4 pt-2 pb-4 space-y-2 sm:px-6 bg-blue-50 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-4'
                    }`}>
                    {navItems.map((item) => (
                        <div key={item.href}>
                            <Link
                                href={item.href}
                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 transform hover:translate-x-1 ${(item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))
                                    ? `text-${theme.accent}-700 font-bold`
                                    : `text-gray-600 hover:text-${theme.accent}-600`
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </nav>
    )
}

export default AdminNav