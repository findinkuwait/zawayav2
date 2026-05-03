'use client'

import { useState } from 'react'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import ImageUpload from '../_components/ImageUpload'
import { Plus, X, GripVertical } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type BL = { en: string; ar: string }
type Step = { _key: string; title: BL; description: BL; insight: BL; imageRef: string; imageUrl: string }

function newStep(): Step {
    return {
        _key: Date.now().toString(),
        title: { en: '', ar: '' },
        description: { en: '', ar: '' },
        insight: { en: '', ar: '' },
        imageRef: '',
        imageUrl: '',
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProcessEditor({ initialData }: { initialData: any }) {
    const d = initialData ?? {}

    const [title,    setTitle]    = useState<BL>({ en: d.title?.en ?? '',    ar: d.title?.ar ?? '' })
    const [subtitle, setSubtitle] = useState<BL>({ en: d.subtitle?.en ?? '', ar: d.subtitle?.ar ?? '' })

    const [steps, setSteps] = useState<Step[]>(() => {
        if (!d.steps) return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.steps.map((s: any, i: number) => ({
            _key:       s._key ?? String(i),
            title:      { en: s.title?.en ?? '', ar: s.title?.ar ?? '' },
            description:{ en: s.description?.en ?? '', ar: s.description?.ar ?? '' },
            insight:    { en: s.insight?.en ?? '', ar: s.insight?.ar ?? '' },
            imageRef:   s.image?.asset?._ref ?? '',
            imageUrl:   s.image ? urlFor(s.image).width(400).url() : '',
        }))
    })

    const [saving, setSaving] = useState(false)
    const [saved,  setSaved]  = useState(false)
    const [error,  setError]  = useState('')

    function updateStep<K extends keyof Step>(key: string, field: K, value: Step[K]) {
        setSteps(ss => ss.map(s => s._key === key ? { ...s, [field]: value } : s))
    }

    async function save() {
        setSaving(true); setSaved(false); setError('')
        try {
            const res = await fetch('/api/admin/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _type: 'processPage', _id: 'processPage',
                    title, subtitle,
                    steps: steps.map(s => ({
                        _type: 'object',
                        _key: s._key,
                        title: s.title,
                        description: s.description,
                        insight: s.insight,
                        ...(s.imageRef ? { image: { _type: 'image', asset: { _type: 'reference', _ref: s.imageRef } } } : {}),
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
            <SaveBar title="Process Page" saving={saving} saved={saved} error={error} onSave={save} />
            <div className="p-8 space-y-10 max-w-3xl">

                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Section Header</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Section Title" enValue={title.en} arValue={title.ar}
                            onEnChange={v => setTitle(p => ({ ...p, en: v }))} onArChange={v => setTitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Section Subtitle" enValue={subtitle.en} arValue={subtitle.ar}
                            onEnChange={v => setSubtitle(p => ({ ...p, en: v }))} onArChange={v => setSubtitle(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Process Steps</h2>
                        <button
                            type="button"
                            onClick={() => setSteps(ss => [...ss, newStep()])}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors font-medium"
                        >
                            <Plus size={12} /> Add Step
                        </button>
                    </div>

                    {steps.length === 0 ? (
                        <p className="text-sm text-stone-400 py-6 border-2 border-dashed border-stone-200 text-center">No steps yet</p>
                    ) : (
                        <div className="space-y-6">
                            {steps.map((step, idx) => (
                                <div key={step._key} className="border border-stone-200 p-5 bg-stone-50/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <GripVertical size={14} className="text-stone-400" />
                                            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Step {idx + 1}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSteps(ss => ss.filter(s => s._key !== step._key))}
                                            className="text-stone-400 hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <BilingualInput label="Step Title"
                                            enValue={step.title.en} arValue={step.title.ar}
                                            onEnChange={v => updateStep(step._key, 'title', { ...step.title, en: v })}
                                            onArChange={v => updateStep(step._key, 'title', { ...step.title, ar: v })}
                                        />
                                        <BilingualInput label="Description" multiline rows={3}
                                            enValue={step.description.en} arValue={step.description.ar}
                                            onEnChange={v => updateStep(step._key, 'description', { ...step.description, en: v })}
                                            onArChange={v => updateStep(step._key, 'description', { ...step.description, ar: v })}
                                        />
                                        <BilingualInput label="Insight Quote (optional)"
                                            enValue={step.insight.en} arValue={step.insight.ar}
                                            onEnChange={v => updateStep(step._key, 'insight', { ...step.insight, en: v })}
                                            onArChange={v => updateStep(step._key, 'insight', { ...step.insight, ar: v })}
                                        />
                                        <ImageUpload
                                            label="Step Image"
                                            currentUrl={step.imageUrl || undefined}
                                            onUploaded={(assetId, url) => {
                                                updateStep(step._key, 'imageRef', assetId)
                                                updateStep(step._key, 'imageUrl', url)
                                            }}
                                        />
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
