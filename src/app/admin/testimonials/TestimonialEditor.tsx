'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'

type BL = { en: string; ar: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TestimonialEditor({ initialData }: { initialData: any }) {
    const router = useRouter()
    const d = initialData ?? {}

    const [quote,  setQuote]  = useState<BL>({ en: d.quote?.en ?? '', ar: d.quote?.ar ?? '' })
    const [author, setAuthor] = useState(d.author ?? '')
    const [role,   setRole]   = useState<BL>({ en: d.role?.en ?? '', ar: d.role?.ar ?? '' })
    const [order,  setOrder]  = useState(d.order !== undefined ? String(d.order) : '')

    const [saving, setSaving] = useState(false)
    const [saved,  setSaved]  = useState(false)
    const [error,  setError]  = useState('')

    async function save() {
        setSaving(true); setSaved(false); setError('')
        try {
            const res = await fetch('/api/admin/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _type: 'testimonial',
                    ...(d._id ? { _id: d._id } : {}),
                    quote,
                    author: author || undefined,
                    role,
                    order: order !== '' ? Number(order) : undefined,
                }),
            })
            if (!res.ok) throw new Error((await res.json()).error)
            const json = await res.json()
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
            if (!d._id && json._id) {
                router.replace(`/admin/testimonials/${json._id}`)
            }
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Save failed')
        } finally {
            setSaving(false)
        }
    }

    const inputClass = 'w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors'

    return (
        <div>
            <SaveBar
                title={d._id ? 'Edit Testimonial' : 'New Testimonial'}
                saving={saving} saved={saved} error={error} onSave={save}
            />
            <div className="p-8 space-y-8 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Testimonial</h2>
                    <div className="space-y-4">
                        <BilingualInput
                            label="Quote"
                            enValue={quote.en} arValue={quote.ar}
                            onEnChange={v => setQuote(p => ({ ...p, en: v }))}
                            onArChange={v => setQuote(p => ({ ...p, ar: v }))}
                            multiline rows={4}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Author Name</label>
                                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Display Order</label>
                                <input type="number" value={order} onChange={e => setOrder(e.target.value)} className={inputClass} />
                            </div>
                        </div>

                        <BilingualInput
                            label="Role / Title"
                            enValue={role.en} arValue={role.ar}
                            onEnChange={v => setRole(p => ({ ...p, en: v }))}
                            onArChange={v => setRole(p => ({ ...p, ar: v }))}
                        />
                    </div>
                </section>

            </div>
        </div>
    )
}
