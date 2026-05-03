'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    LayoutDashboard, Home, Briefcase, FolderOpen,
    Layers, Info, Users, Phone, MessageSquare,
    Settings, LogOut, ChevronRight,
} from 'lucide-react'
import Image from 'next/image'

const NAV = [
    { label: 'Dashboard',    href: '/admin',              icon: LayoutDashboard },
    { label: 'Home Page',    href: '/admin/home',         icon: Home },
    { label: 'Services',     href: '/admin/services',     icon: Briefcase },
    { label: 'Projects',     href: '/admin/projects',     icon: FolderOpen },
    { label: 'Process',      href: '/admin/process',      icon: Layers },
    { label: 'About',        href: '/admin/about',        icon: Info },
    { label: 'Clients',      href: '/admin/clients',      icon: Users },
    { label: 'Contact',      href: '/admin/contact',      icon: Phone },
    { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { label: 'Site Settings',href: '/admin/site-settings',icon: Settings },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const router   = useRouter()

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/admin/login')
        router.refresh()
    }

    return (
        <aside className="w-60 shrink-0 bg-white border-r border-stone-200 flex flex-col min-h-screen sticky top-0 h-screen">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-stone-200">
                <Image src="/logo.png" alt="Zawaya" width={120} height={36} className="h-9 w-auto" />
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1 font-medium">Admin Panel</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 overflow-y-auto">
                {NAV.map(({ label, href, icon: Icon }) => {
                    const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors duration-150 group ${
                                active
                                    ? 'bg-[#F5EAE4] text-[#B05B3B] border-r-2 border-[#B05B3B]'
                                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                            }`}
                        >
                            <Icon size={16} className={active ? 'text-[#B05B3B]' : 'text-stone-400 group-hover:text-stone-600'} />
                            {label}
                            {active && <ChevronRight size={12} className="ml-auto text-[#B05B3B]" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-stone-200 p-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-2 py-2 text-sm text-stone-500 hover:text-red-600 transition-colors"
                >
                    <LogOut size={15} />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
