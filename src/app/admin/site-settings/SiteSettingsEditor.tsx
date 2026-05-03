'use client'

import { useState } from 'react'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import ImageUpload from '../_components/ImageUpload'
import { urlFor } from '@/sanity/lib/image'

type BL = { en: string; ar: string }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SiteSettingsEditor({ initialData }: { initialData: any }) {
    const d = initialData ?? {}

    const [siteName,      setSiteName]      = useState(d.siteName ?? '')
    const [whatsapp,      setWhatsapp]      = useState(d.whatsappNumber ?? '')
    const [phone,         setPhone]         = useState(d.phone ?? '')
    const [email,         setEmail]         = useState(d.email ?? '')
    const [instagram,     setInstagram]     = useState(d.instagram ?? '')
    const [facebook,      setFacebook]      = useState(d.facebook ?? '')
    const [linkedin,      setLinkedin]      = useState(d.linkedin ?? '')
    const [address,       setAddress]       = useState<BL>({ en: d.address?.en ?? '',       ar: d.address?.ar ?? '' })
    const [footerTagline, setFooterTagline] = useState<BL>({ en: d.footerTagline?.en ?? '', ar: d.footerTagline?.ar ?? '' })

    const [logoRef, setLogoRef] = useState(d.logo?.asset?._ref ?? '')
    const [logoUrl, setLogoUrl] = useState<string>(d.logo ? urlFor(d.logo).width(300).url() : '')

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
                    _type: 'siteSettings', _id: 'siteSettings',
                    siteName: siteName || undefined,
                    whatsappNumber: whatsapp || undefined,
                    phone: phone || undefined,
                    email: email || undefined,
                    instagram: instagram || undefined,
                    facebook: facebook || undefined,
                    linkedin: linkedin || undefined,
                    address,
                    footerTagline,
                    ...(logoRef ? { logo: { _type: 'image', asset: { _type: 'reference', _ref: logoRef } } } : {}),
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
            <SaveBar title="Site Settings" saving={saving} saved={saved} error={error} onSave={save} />
            <div className="p-8 space-y-10 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Brand</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Site Name</label>
                            <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className={inputClass} />
                        </div>
                        <ImageUpload label="Logo" currentUrl={logoUrl || undefined}
                            onUploaded={(assetId, url) => { setLogoRef(assetId); setLogoUrl(url) }} />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Contact Details</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
                                <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} dir="ltr" className={inputClass} placeholder="+96512345678" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Phone</label>
                                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} dir="ltr" className={inputClass} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} dir="ltr" className={inputClass} />
                        </div>
                        <BilingualInput label="Address" enValue={address.en} arValue={address.ar}
                            onEnChange={v => setAddress(p => ({ ...p, en: v }))} onArChange={v => setAddress(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Social Links</h2>
                    <div className="space-y-3">
                        {([
                            ['Instagram', instagram, setInstagram],
                            ['Facebook',  facebook,  setFacebook],
                            ['LinkedIn',  linkedin,  setLinkedin],
                        ] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
                            <div key={label}>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">{label} URL</label>
                                <input type="url" value={val} onChange={e => setter(e.target.value)} dir="ltr" className={inputClass} placeholder="https://..." />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Footer</h2>
                    <BilingualInput label="Footer Tagline" enValue={footerTagline.en} arValue={footerTagline.ar}
                        onEnChange={v => setFooterTagline(p => ({ ...p, en: v }))} onArChange={v => setFooterTagline(p => ({ ...p, ar: v }))} />
                </section>

            </div>
        </div>
    )
}
