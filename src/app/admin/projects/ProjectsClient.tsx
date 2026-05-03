'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react'

interface ProjectRow {
    _id: string
    title: string
    category: string
    slug: string
    imgUrl: string | null
}

export default function ProjectsClient({ projects: initial }: { projects: ProjectRow[] }) {
    const router = useRouter()
    const [projects, setProjects] = useState(initial)
    const [deleting, setDeleting] = useState<string | null>(null)

    async function handleDelete(id: string) {
        if (!confirm('Delete this project? This cannot be undone.')) return
        setDeleting(id)
        await fetch('/api/admin/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id }),
        })
        setProjects(p => p.filter(x => x._id !== id))
        setDeleting(null)
        router.refresh()
    }

    return (
        <div>
            <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-stone-200 sticky top-0 z-10">
                <h1 className="text-lg font-bold text-stone-800">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-5 py-2 bg-[#B05B3B] text-white text-sm font-semibold hover:bg-[#9a4f32] transition-colors"
                >
                    <Plus size={16} /> Add Project
                </Link>
            </div>

            <div className="p-8">
                {projects.length === 0 ? (
                    <div className="text-center py-16 text-stone-400">
                        <p className="text-lg font-medium">No projects yet</p>
                        <p className="text-sm mt-1">Click &ldquo;Add Project&rdquo; to create your first one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map(p => (
                            <div key={p._id} className="bg-white border border-stone-200 overflow-hidden group">
                                {/* Image */}
                                <div className="relative h-36 bg-stone-100">
                                    {p.imgUrl ? (
                                        <Image src={p.imgUrl} alt={p.title} fill className="object-cover" unoptimized />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <ImageOff size={24} className="text-stone-300" />
                                        </div>
                                    )}
                                    {p.category && (
                                        <span className="absolute top-2 left-2 bg-[#B05B3B] text-white text-[10px] px-2 py-1 uppercase tracking-wider font-medium">
                                            {p.category}
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <p className="font-semibold text-stone-800 text-sm truncate">{p.title}</p>
                                    {p.slug && <p className="text-xs text-stone-400 mt-0.5 truncate">/{p.slug}</p>}

                                    <div className="flex gap-2 mt-3">
                                        <Link
                                            href={`/admin/projects/${p._id}`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors"
                                        >
                                            <Pencil size={12} /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            disabled={deleting === p._id}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                        >
                                            <Trash2 size={12} /> {deleting === p._id ? 'Deleting…' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
