'use client'

import { useState } from 'react'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import ImageUpload from '../_components/ImageUpload'
import { Plus, X } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type BL = { en: string; ar: string }
type ClientItem = { _key: string; name: string; url: string; logoRef: string; logoUrl: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ClientsEditor({ initialData }: { initialData: any }) {
    const d = initialData ?? {}

    const [title,    setTitle]    = useState<BL>({ en: d.title?.en ?? '',    ar: d.title?.ar ?? '' })
    const [subtitle, setSubtitle] = useState<BL>({ en: d.subtitle?.en ?? '', ar: d.subtitle?.ar ?? '' })

    const [clients, setClients] = useState<ClientItem[]>(() => {
        if (!d.clients) return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.clients.map((c: any, i: number) => ({
            _key:    c._key ?? String(i),
            name:    c.name ?? '',
            url:     c.url ?? '',
            logoRef: c.logo?.asset?._ref ?? '',
            logoUrl: c.logo ? urlFor(c.logo).width(200).url() : '',
        }))
    })

    const [saving, setSaving] = useState(false)
    const [saved,  setSaved]  = useState(false)
    const [error,  setError]  = useState('')

    function addClient() {
        setClients(cs => [...cs, { _key: Date.now().toString(), name: '', url: '', logoRef: '', logoUrl: '' }])
    }

    function updateClient<K extends keyof ClientItem>(key: string, field: K, value: ClientItem[K]) {
        setClients(cs => cs.map(c => c._key === key ? { ...c, [field]: value } : c))
    }

    const inputClass = 'w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors'

    async function save() {
        setSaving(true); setSaved(false); setError('')
        try {
            const res = await fetch('/api/admin/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _type: 'clientsPage', _id: 'clientsPage',
                    title, subtitle,
                    clients: clients.map(c => ({
                        _key: c._key,
                        name: c.name || undefined,
                        url: c.url || undefined,
                        ...(c.logoRef ? { logo: { _type: 'image', asset: { _type: 'reference', _ref: c.logoRef } } } : {}),
                    })),
                }),
            })
            if (!res.ok) throw new Error((await res.json()).error)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Save failed')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <SaveBar title="Clients Page" saving={saving} saved={saved} error={error} onSave={save} />
            <div className="p-8 space-y-10 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Page Header</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Page Title" enValue={title.en} arValue={title.ar}
                            onEnChange={v => setTitle(p => ({ ...p, en: v }))} onArChange={v => setTitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Subtitle" enValue={subtitle.en} arValue={subtitle.ar}
                            onEnChange={v => setSubtitle(p => ({ ...p, en: v }))} onArChange={v => setSubtitle(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Client Logos</h2>
                        <button type="button" onClick={addClient}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors font-medium">
                            <Plus size={12} /> Add Client
                        </button>
                    </div>

                    {clients.length === 0 ? (
                        <p className="text-sm text-stone-400 py-4 border-2 border-dashed border-stone-200 text-center">No clients yet</p>
                    ) : (
                        <div className="space-y-4">
                            {clients.map(c => (
                                <div key={c._key} className="border border-stone-200 p-4 bg-stone-50/50">
                                    <div className="flex justify-end mb-3">
                                        <button type="button" onClick={() => setClients(cs => cs.filter(x => x._key !== c._key))}
                                            className="text-stone-400 hover:text-red-500 transition-colors">
                                            <X size={13} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Name</label>
                                            <input type="text" value={c.name}
                                                onChange={e => updateClient(c._key, 'name', e.target.value)}
                                                className={inputClass} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Website URL</label>
                                            <input type="url" value={c.url}
                                                onChange={e => updateClient(c._key, 'url', e.target.value)}
                                                className={inputClass} dir="ltr" />
                                        </div>
                                    </div>
                                    <ImageUpload
                                        label="Logo"
                                        currentUrl={c.logoUrl || undefined}
                                        onUploaded={(assetId, url) => {
                                            updateClient(c._key, 'logoRef', assetId)
                                            updateClient(c._key, 'logoUrl', url)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    )
}
