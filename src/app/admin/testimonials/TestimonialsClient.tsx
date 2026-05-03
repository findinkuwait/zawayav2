'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Quote } from 'lucide-react'

interface TestimonialRow {
    _id: string
    author: string
    quoteEn: string
    order: number
}

export default function TestimonialsClient({ testimonials: initial }: { testimonials: TestimonialRow[] }) {
    const router = useRouter()
    const [testimonials, setTestimonials] = useState(initial)
    const [deleting, setDeleting] = useState<string | null>(null)

    async function handleDelete(id: string) {
        if (!confirm('Delete this testimonial?')) return
        setDeleting(id)
        await fetch('/api/admin/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id }),
        })
        setTestimonials(t => t.filter(x => x._id !== id))
        setDeleting(null)
        router.refresh()
    }

    return (
        <div>
            <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-stone-200 sticky top-0 z-10">
                <h1 className="text-lg font-bold text-stone-800">Testimonials</h1>
                <Link
                    href="/admin/testimonials/new"
                    className="flex items-center gap-2 px-5 py-2 bg-[#B05B3B] text-white text-sm font-semibold hover:bg-[#9a4f32] transition-colors"
                >
                    <Plus size={16} /> Add Testimonial
                </Link>
            </div>

            <div className="p-8">
                {testimonials.length === 0 ? (
                    <div className="text-center py-16 text-stone-400">
                        <p className="text-lg font-medium">No testimonials yet</p>
                        <p className="text-sm mt-1">Click &ldquo;Add Testimonial&rdquo; to add one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testimonials.map(t => (
                            <div key={t._id} className="bg-white border border-stone-200 p-5">
                                <Quote size={18} className="text-[#B05B3B] mb-3" />
                                <p className="text-sm text-stone-600 line-clamp-3 italic mb-3">{t.quoteEn || '(no quote)'}</p>
                                <p className="text-sm font-semibold text-stone-800">{t.author || '(no author)'}</p>
                                <div className="flex gap-2 mt-3">
                                    <Link
                                        href={`/admin/testimonials/${t._id}`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors"
                                    >
                                        <Pencil size={12} /> Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(t._id)}
                                        disabled={deleting === t._id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                                    >
                                        <Trash2 size={12} /> {deleting === t._id ? 'Deleting…' : 'Delete'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
