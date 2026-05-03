import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from './_components/AdminShell'
import { client } from '@/sanity/lib/client'
import Link from 'next/link'
import {
    Home, Briefcase, FolderOpen, Layers, Info,
    Users, Phone, MessageSquare, Settings, ArrowRight,
} from 'lucide-react'

const SECTIONS = [
    { label: 'Home Page',     href: '/admin/home',          icon: Home,          desc: 'Hero slides, stats, CTA text' },
    { label: 'Services',      href: '/admin/services',      icon: Briefcase,     desc: 'Service cards and descriptions' },
    { label: 'Projects',      href: '/admin/projects',      icon: FolderOpen,    desc: 'Portfolio projects with images' },
    { label: 'Process',       href: '/admin/process',       icon: Layers,        desc: 'Work process steps' },
    { label: 'About',         href: '/admin/about',         icon: Info,          desc: 'About page content' },
    { label: 'Clients',       href: '/admin/clients',       icon: Users,         desc: 'Client logos and names' },
    { label: 'Contact',       href: '/admin/contact',       icon: Phone,         desc: 'Contact info and address' },
    { label: 'Testimonials',  href: '/admin/testimonials',  icon: MessageSquare, desc: 'Client testimonials' },
    { label: 'Site Settings', href: '/admin/site-settings', icon: Settings,      desc: 'WhatsApp, email, social links' },
]

export default async function AdminDashboard() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const [projectCount, serviceCount, testimonialCount] = await Promise.all([
        client.fetch<number>(`count(*[_type == "project"])`),
        client.fetch<number>(`count(*[_type == "service"])`),
        client.fetch<number>(`count(*[_type == "testimonial"])`),
    ])

    return (
        <AdminShell>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
                    <p className="text-stone-500 mt-1 text-sm">Welcome back. Manage all website content from here.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {[
                        { label: 'Projects',     value: projectCount },
                        { label: 'Services',     value: serviceCount },
                        { label: 'Testimonials', value: testimonialCount },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-white border border-stone-200 p-6">
                            <p className="text-3xl font-bold text-[#B05B3B]">{value}</p>
                            <p className="text-sm text-stone-500 mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Section cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SECTIONS.map(({ label, href, icon: Icon, desc }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group bg-white border border-stone-200 p-6 hover:border-[#B05B3B] hover:shadow-sm transition-all duration-200"
                        >
                            <div className="flex items-start justify-between">
                                <div className="w-10 h-10 bg-[#F5EAE4] flex items-center justify-center mb-4 group-hover:bg-[#B05B3B] transition-colors">
                                    <Icon size={18} className="text-[#B05B3B] group-hover:text-white transition-colors" />
                                </div>
                                <ArrowRight size={16} className="text-stone-300 group-hover:text-[#B05B3B] transition-colors mt-1" />
                            </div>
                            <h3 className="font-semibold text-stone-800 mb-1">{label}</h3>
                            <p className="text-xs text-stone-500">{desc}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminShell>
    )
}
