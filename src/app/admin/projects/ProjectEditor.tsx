'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import ImageUpload from '../_components/ImageUpload'
import { Plus, X } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type BL = { en: string; ar: string }
type GalleryItem = { _key: string; assetId: string; url: string }

function bl(v: { en?: string; ar?: string } | null | undefined, fallback = '') {
    return v?.en ?? fallback
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectEditor({ initialData }: { initialData: any }) {
    const router = useRouter()
    const d = initialData ?? {}

    const [title,    setTitle]    = useState<BL>({ en: d.title?.en ?? '',    ar: d.title?.ar ?? '' })
    const [slug,     setSlug]     = useState(d.slug?.current ?? '')
    const [category, setCategory] = useState<BL>({ en: d.category?.en ?? '', ar: d.category?.ar ?? '' })
    const [client,   setClient]   = useState(d.client ?? '')
    const [location, setLocation] = useState<BL>({ en: d.location?.en ?? '', ar: d.location?.ar ?? '' })
    const [area,     setArea]     = useState(d.area ?? '')
    const [completedAt, setCompletedAt] = useState(d.completedAt ?? '')
    const [overview, setOverview] = useState<BL>({ en: d.overview?.en ?? '', ar: d.overview?.ar ?? '' })
    const [scope,    setScope]    = useState<BL>({ en: d.scope?.en ?? '',    ar: d.scope?.ar ?? '' })
    const [featured, setFeatured] = useState<boolean>(d.featured ?? false)
    const [order,    setOrder]    = useState(d.order !== undefined ? String(d.order) : '')

    const [coverRef, setCoverRef] = useState(d.coverImage?.asset?._ref ?? '')
    const [coverUrl, setCoverUrl] = useState<string>(
        d.coverImage ? urlFor(d.coverImage).width(600).url() : ''
    )

    const [gallery, setGallery] = useState<GalleryItem[]>(() => {
        if (!d.gallery) return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.gallery.map((img: any, i: number) => ({
            _key: img._key ?? String(i),
            assetId: img.asset?._ref ?? '',
            url: urlFor(img).width(400).url(),
        }))
    })

    const [saving, setSaving] = useState(false)
    const [saved,  setSaved]  = useState(false)
    const [error,  setError]  = useState('')

    function generateSlug(val: string) {
        return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    function addGallerySlot() {
        setGallery(g => [...g, { _key: Date.now().toString(), assetId: '', url: '' }])
    }

    function removeGalleryItem(key: string) {
        setGallery(g => g.filter(i => i._key !== key))
    }

    function updateGalleryItem(key: string, assetId: string, url: string) {
        setGallery(g => g.map(i => i._key === key ? { ...i, assetId, url } : i))
    }

    async function save() {
        if (!slug.trim()) { setError('Slug is required'); return }
        setSaving(true); setSaved(false); setError('')
        try {
            const res = await fetch('/api/admin/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _type: 'project',
                    ...(d._id ? { _id: d._id } : {}),
                    title,
                    slug: { _type: 'slug', current: slug },
                    category,
                    client: client || undefined,
                    location,
                    area: area || undefined,
                    completedAt: completedAt || undefined,
                    overview,
                    scope,
                    featured,
                    order: order !== '' ? Number(order) : undefined,
                    ...(coverRef ? { coverImage: { _type: 'image', asset: { _type: 'reference', _ref: coverRef } } } : {}),
                    gallery: gallery
                        .filter(i => i.assetId)
                        .map(i => ({ _type: 'image', _key: i._key, asset: { _type: 'reference', _ref: i.assetId } })),
                }),
            })
            if (!res.ok) throw new Error((await res.json()).error)
            const json = await res.json()
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
            if (!d._id && json._id) {
                router.replace(`/admin/projects/${json._id}`)
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
                title={d._id ? `Edit: ${bl(d.title) || 'Project'}` : 'New Project'}
                saving={saving} saved={saved} error={error} onSave={save}
            />
            <div className="p-8 space-y-10 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Basic Info</h2>
                    <div className="space-y-4">
                        <BilingualInput
                            label="Title"
                            enValue={title.en} arValue={title.ar}
                            onEnChange={v => {
                                setTitle(p => ({ ...p, en: v }))
                                if (!d._id) setSlug(generateSlug(v))
                            }}
                            onArChange={v => setTitle(p => ({ ...p, ar: v }))}
                            required
                        />

                        <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Slug</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                    placeholder="project-url-slug"
                                    className={inputClass}
                                    dir="ltr"
                                />
                                <button
                                    type="button"
                                    onClick={() => setSlug(generateSlug(title.en))}
                                    className="shrink-0 px-3 py-2 bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200 transition-colors"
                                >
                                    Auto
                                </button>
                            </div>
                        </div>

                        <BilingualInput
                            label="Category"
                            enValue={category.en} arValue={category.ar}
                            onEnChange={v => setCategory(p => ({ ...p, en: v }))}
                            onArChange={v => setCategory(p => ({ ...p, ar: v }))}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Client Name</label>
                                <input type="text" value={client} onChange={e => setClient(e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Completion Year</label>
                                <input type="text" value={completedAt} onChange={e => setCompletedAt(e.target.value)} placeholder="2024" className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Area (e.g. 450 sqm)</label>
                                <input type="text" value={area} onChange={e => setArea(e.target.value)} placeholder="450 sqm" className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Display Order</label>
                                <input type="number" value={order} onChange={e => setOrder(e.target.value)} className={inputClass} />
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Location & Details</h2>
                    <div className="space-y-4">
                        <BilingualInput
                            label="Location"
                            enValue={location.en} arValue={location.ar}
                            onEnChange={v => setLocation(p => ({ ...p, en: v }))}
                            onArChange={v => setLocation(p => ({ ...p, ar: v }))}
                        />
                        <BilingualInput
                            label="Overview / Description"
                            enValue={overview.en} arValue={overview.ar}
                            onEnChange={v => setOverview(p => ({ ...p, en: v }))}
                            onArChange={v => setOverview(p => ({ ...p, ar: v }))}
                            multiline rows={4}
                        />
                        <BilingualInput
                            label="Scope of Work"
                            enValue={scope.en} arValue={scope.ar}
                            onEnChange={v => setScope(p => ({ ...p, en: v }))}
                            onArChange={v => setScope(p => ({ ...p, ar: v }))}
                        />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Images</h2>
                    <div className="space-y-6">
                        <ImageUpload
                            label="Cover Image"
                            currentUrl={coverUrl || undefined}
                            onUploaded={(assetId, url) => { setCoverRef(assetId); setCoverUrl(url) }}
                        />

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Gallery Images</label>
                                <button
                                    type="button"
                                    onClick={addGallerySlot}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors font-medium"
                                >
                                    <Plus size={12} /> Add Image
                                </button>
                            </div>
                            {gallery.length === 0 ? (
                                <p className="text-sm text-stone-400 py-4 border-2 border-dashed border-stone-200 text-center">
                                    No gallery images yet
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {gallery.map(item => (
                                        <div key={item._key} className="relative">
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryItem(item._key)}
                                                className="absolute top-2 right-2 z-10 bg-white/90 p-1 shadow hover:bg-red-50"
                                            >
                                                <X size={12} className="text-red-500" />
                                            </button>
                                            <ImageUpload
                                                currentUrl={item.url || undefined}
                                                onUploaded={(assetId, url) => updateGalleryItem(item._key, assetId, url)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Settings</h2>
                    <label className="flex items-center gap-3 cursor-pointer w-fit">
                        <div
                            onClick={() => setFeatured(f => !f)}
                            className={`relative w-10 h-5 rounded-full transition-colors ${featured ? 'bg-[#B05B3B]' : 'bg-stone-300'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${featured ? 'translate-x-5' : ''}`} />
                        </div>
                        <span className="text-sm font-medium text-stone-700">Featured on Homepage</span>
                    </label>
                </section>

            </div>
        </div>
    )
}
