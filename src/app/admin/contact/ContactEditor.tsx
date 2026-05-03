'use client'

import { useState } from 'react'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'

type BL = { en: string; ar: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ContactEditor({ initialData }: { initialData: any }) {
    const d = initialData ?? {}

    const [title,     setTitle]     = useState<BL>({ en: d.title?.en ?? '',     ar: d.title?.ar ?? '' })
    const [subtitle,  setSubtitle]  = useState<BL>({ en: d.subtitle?.en ?? '',  ar: d.subtitle?.ar ?? '' })
    const [infoTitle, setInfoTitle] = useState<BL>({ en: d.infoTitle?.en ?? '', ar: d.infoTitle?.ar ?? '' })
    const [address,   setAddress]   = useState<BL>({ en: d.address?.en ?? '',   ar: d.address?.ar ?? '' })
    const [phone,     setPhone]     = useState(d.phone ?? '')
    const [email,     setEmail]     = useState(d.email ?? '')
    const [mapUrl,    setMapUrl]    = useState(d.mapEmbedUrl ?? '')

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
                    _type: 'contactPage', _id: 'contactPage',
                    title, subtitle, infoTitle, address,
                    phone: phone || undefined,
                    email: email || undefined,
                    mapEmbedUrl: mapUrl || undefined,
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

    const inputClass = 'w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors'

    return (
        <div>
            <SaveBar title="Contact Page" saving={saving} saved={saved} error={error} onSave={save} />
            <div className="p-8 space-y-10 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Page Header</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Page Title" enValue={title.en} arValue={title.ar}
                            onEnChange={v => setTitle(p => ({ ...p, en: v }))} onArChange={v => setTitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Subtitle" enValue={subtitle.en} arValue={subtitle.ar}
                            onEnChange={v => setSubtitle(p => ({ ...p, en: v }))} onArChange={v => setSubtitle(p => ({ ...p, ar: v }))} multiline rows={2} />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Contact Info</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Info Card Title" enValue={infoTitle.en} arValue={infoTitle.ar}
                            onEnChange={v => setInfoTitle(p => ({ ...p, en: v }))} onArChange={v => setInfoTitle(p => ({ ...p, ar: v }))} />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Phone</label>
                                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" className={inputClass} placeholder="+965 1234 5678" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Email</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} dir="ltr" className={inputClass} />
                            </div>
                        </div>

                        <BilingualInput label="Address" enValue={address.en} arValue={address.ar}
                            onEnChange={v => setAddress(p => ({ ...p, en: v }))} onArChange={v => setAddress(p => ({ ...p, ar: v }))} />

                        <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Google Maps Embed URL</label>
                            <input type="url" value={mapUrl} onChange={e => setMapUrl(e.target.value)} dir="ltr" className={inputClass} placeholder="https://maps.google.com/maps?..." />
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
