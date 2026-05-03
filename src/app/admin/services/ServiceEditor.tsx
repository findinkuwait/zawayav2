'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import ImageUpload from '../_components/ImageUpload'
import { urlFor } from '@/sanity/lib/image'

type BL = { en: string; ar: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ServiceEditor({ initialData }: { initialData: any }) {
    const router = useRouter()
    const d = initialData ?? {}

    const [order,        setOrder]        = useState(d.order !== undefined ? String(d.order) : '')
    const [title,        setTitle]        = useState<BL>({ en: d.title?.en ?? '',        ar: d.title?.ar ?? '' })
    const [description,  setDescription]  = useState<BL>({ en: d.description?.en ?? '',  ar: d.description?.ar ?? '' })
    const [tag,          setTag]          = useState<BL>({ en: d.tag?.en ?? '',          ar: d.tag?.ar ?? '' })
    const [capabilities, setCapabilities] = useState<BL>({ en: d.capabilities?.en ?? '', ar: d.capabilities?.ar ?? '' })

    const [imageRef, setImageRef] = useState(d.image?.asset?._ref ?? '')
    const [imageUrl, setImageUrl] = useState<string>(
        d.image ? urlFor(d.image).width(600).url() : ''
    )

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
                    _type: 'service',
                    ...(d._id ? { _id: d._id } : {}),
                    order: order !== '' ? Number(order) : undefined,
                    title,
                    description,
                    tag,
                    capabilities,
                    ...(imageRef ? { image: { _type: 'image', asset: { _type: 'reference', _ref: imageRef } } } : {}),
                }),
            })
            if (!res.ok) throw new Error((await res.json()).error)
            const json = await res.json()
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
            if (!d._id && json._id) {
                router.replace(`/admin/services/${json._id}`)
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
                title={d._id ? `Edit Service` : 'New Service'}
                saving={saving} saved={saved} error={error} onSave={save}
            />
            <div className="p-8 space-y-8 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Service Info</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Display Order</label>
                            <input type="number" value={order} onChange={e => setOrder(e.target.value)} className={`${inputClass} max-w-xs`} placeholder="1" />
                        </div>
                        <BilingualInput
                            label="Title"
                            enValue={title.en} arValue={title.ar}
                            onEnChange={v => setTitle(p => ({ ...p, en: v }))}
                            onArChange={v => setTitle(p => ({ ...p, ar: v }))}
                            required
                        />
                        <BilingualInput
                            label="Description"
                            enValue={description.en} arValue={description.ar}
                            onEnChange={v => setDescription(p => ({ ...p, en: v }))}
                            onArChange={v => setDescription(p => ({ ...p, ar: v }))}
                            multiline rows={3}
                        />
                        <BilingualInput
                            label="Category Tag"
                            enValue={tag.en} arValue={tag.ar}
                            onEnChange={v => setTag(p => ({ ...p, en: v }))}
                            onArChange={v => setTag(p => ({ ...p, ar: v }))}
                        />
                        <BilingualInput
                            label="Key Capabilities (comma-separated)"
                            enValue={capabilities.en} arValue={capabilities.ar}
                            onEnChange={v => setCapabilities(p => ({ ...p, en: v }))}
                            onArChange={v => setCapabilities(p => ({ ...p, ar: v }))}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Image</h2>
                    <ImageUpload
                        currentUrl={imageUrl || undefined}
                        onUploaded={(assetId, url) => { setImageRef(assetId); setImageUrl(url) }}
                    />
                </section>

            </div>
        </div>
    )
}
