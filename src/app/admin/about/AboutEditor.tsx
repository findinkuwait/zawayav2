'use client'

import { useState } from 'react'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import { Plus, X } from 'lucide-react'

type BL = { en: string; ar: string }
type Stat = { _key: string; value: string; label: BL }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AboutEditor({ initialData }: { initialData: any }) {
    const d = initialData ?? {}

    const [title,    setTitle]    = useState<BL>({ en: d.title?.en ?? '',    ar: d.title?.ar ?? '' })
    const [subtitle, setSubtitle] = useState<BL>({ en: d.subtitle?.en ?? '', ar: d.subtitle?.ar ?? '' })
    const [p1, setP1] = useState<BL>({ en: d.p1?.en ?? '', ar: d.p1?.ar ?? '' })
    const [p2, setP2] = useState<BL>({ en: d.p2?.en ?? '', ar: d.p2?.ar ?? '' })
    const [p3, setP3] = useState<BL>({ en: d.p3?.en ?? '', ar: d.p3?.ar ?? '' })

    const [stats, setStats] = useState<Stat[]>(() => {
        if (!d.stats) return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.stats.map((s: any, i: number) => ({
            _key:  s._key ?? String(i),
            value: s.value ?? '',
            label: { en: s.label?.en ?? '', ar: s.label?.ar ?? '' },
        }))
    })

    const [saving, setSaving] = useState(false)
    const [saved,  setSaved]  = useState(false)
    const [error,  setError]  = useState('')

    function addStat() {
        setStats(ss => [...ss, { _key: Date.now().toString(), value: '', label: { en: '', ar: '' } }])
    }

    const inputClass = 'w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors'

    async function save() {
        setSaving(true); setSaved(false); setError('')
        try {
            const res = await fetch('/api/admin/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _type: 'aboutPage', _id: 'aboutPage',
                    title, subtitle, p1, p2, p3,
                    stats: stats.map(s => ({ _key: s._key, value: s.value, label: s.label })),
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
            <SaveBar title="About Page" saving={saving} saved={saved} error={error} onSave={save} />
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
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Body Copy</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Paragraph 1" multiline rows={4}
                            enValue={p1.en} arValue={p1.ar}
                            onEnChange={v => setP1(p => ({ ...p, en: v }))} onArChange={v => setP1(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Paragraph 2" multiline rows={4}
                            enValue={p2.en} arValue={p2.ar}
                            onEnChange={v => setP2(p => ({ ...p, en: v }))} onArChange={v => setP2(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Paragraph 3" multiline rows={4}
                            enValue={p3.en} arValue={p3.ar}
                            onEnChange={v => setP3(p => ({ ...p, en: v }))} onArChange={v => setP3(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Stats</h2>
                        <button type="button" onClick={addStat}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors font-medium">
                            <Plus size={12} /> Add Stat
                        </button>
                    </div>
                    {stats.length === 0 ? (
                        <p className="text-sm text-stone-400 py-4 border-2 border-dashed border-stone-200 text-center">No stats yet</p>
                    ) : (
                        <div className="space-y-3">
                            {stats.map(stat => (
                                <div key={stat._key} className="border border-stone-200 p-4 bg-stone-50/50">
                                    <div className="flex justify-end mb-2">
                                        <button type="button" onClick={() => setStats(ss => ss.filter(s => s._key !== stat._key))}
                                            className="text-stone-400 hover:text-red-500 transition-colors">
                                            <X size={13} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Value</label>
                                            <input type="text" value={stat.value}
                                                onChange={e => setStats(ss => ss.map(s => s._key === stat._key ? { ...s, value: e.target.value } : s))}
                                                placeholder="15+" className={inputClass} />
                                        </div>
                                        <div className="col-span-2">
                                            <BilingualInput label="Label"
                                                enValue={stat.label.en} arValue={stat.label.ar}
                                                onEnChange={v => setStats(ss => ss.map(s => s._key === stat._key ? { ...s, label: { ...s.label, en: v } } : s))}
                                                onArChange={v => setStats(ss => ss.map(s => s._key === stat._key ? { ...s, label: { ...s.label, ar: v } } : s))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    )
}
