'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, ImageOff } from 'lucide-react'

interface ServiceRow {
    _id: string
    order: number
    title: string
    tag: string
    imgUrl: string | null
}

export default function ServicesClient({ services: initial }: { services: ServiceRow[] }) {
    const router = useRouter()
    const [services, setServices] = useState(initial)
    const [deleting, setDeleting] = useState<string | null>(null)

    async function handleDelete(id: string) {
        if (!confirm('Delete this service? This cannot be undone.')) return
        setDeleting(id)
        await fetch('/api/admin/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id }),
        })
        setServices(s => s.filter(x => x._id !== id))
        setDeleting(null)
        router.refresh()
    }

    return (
        <div>
            <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-stone-200 sticky top-0 z-10">
                <h1 className="text-lg font-bold text-stone-800">Services</h1>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-5 py-2 bg-[#B05B3B] text-white text-sm font-semibold hover:bg-[#9a4f32] transition-colors"
                >
                    <Plus size={16} /> Add Service
                </Link>
            </div>

            <div className="p-8">
                {services.length === 0 ? (
                    <div className="text-center py-16 text-stone-400">
                        <p className="text-lg font-medium">No services yet</p>
                        <p className="text-sm mt-1">Click &ldquo;Add Service&rdquo; to create your first one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map(s => (
                            <div key={s._id} className="bg-white border border-stone-200 overflow-hidden group">
                                <div className="relative h-36 bg-stone-100">
                                    {s.imgUrl ? (
                                        <Image src={s.imgUrl} alt={s.title} fill className="object-cover" unoptimized />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <ImageOff size={24} className="text-stone-300" />
                                        </div>
                                    )}
                                    {s.order && (
                                        <span className="absolute top-2 left-2 bg-stone-800/80 text-white text-[10px] px-2 py-1 font-medium">
                                            #{s.order}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="font-semibold text-stone-800 text-sm truncate">{s.title}</p>
                                    {s.tag && <p className="text-xs text-stone-400 mt-0.5">{s.tag}</p>}
                                    <div className="flex gap-2 mt-3">
                                        <Link
                                            href={`/admin/services/${s._id}`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors"
                                        >
                                            <Pencil size={12} /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            disabled={deleting === s._id}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                        >
                                            <Trash2 size={12} /> {deleting === s._id ? 'Deleting…' : 'Delete'}
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
