'use client'

import { useState } from 'react'
import SaveBar from '../_components/SaveBar'
import BilingualInput from '../_components/BilingualInput'
import ImageUpload from '../_components/ImageUpload'
import { Plus, X, GripVertical, Images, BarChart2 } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

type BL = { en: string; ar: string }
type HeroSlide = { _key: string; imageRef: string; imageUrl: string; title: BL; location: BL; category: BL }
type HeroStat  = { _key: string; value: string; label: BL }

function newSlide(): HeroSlide {
    return {
        _key: Date.now().toString(),
        imageRef: '', imageUrl: '',
        title:    { en: '', ar: '' },
        location: { en: '', ar: '' },
        category: { en: '', ar: '' },
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomeEditor({ initialData }: { initialData: any }) {
    const d = initialData ?? {}

    // ── Hero Slides ──────────────────────────────────────────────────
    const [slides, setSlides] = useState<HeroSlide[]>(() => {
        if (!d.heroSlides?.length) return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.heroSlides.map((s: any, i: number) => ({
            _key:     s._key ?? String(i),
            imageRef: s.image?.asset?._ref ?? '',
            imageUrl: s.image ? urlFor(s.image).width(600).url() : '',
            title:    { en: s.title?.en ?? '',    ar: s.title?.ar ?? '' },
            location: { en: s.location?.en ?? '', ar: s.location?.ar ?? '' },
            category: { en: s.category?.en ?? '', ar: s.category?.ar ?? '' },
        }))
    })

    function updateSlide<K extends keyof HeroSlide>(key: string, field: K, value: HeroSlide[K]) {
        setSlides(ss => ss.map(s => s._key === key ? { ...s, [field]: value } : s))
    }

    // ── Hero Stats ───────────────────────────────────────────────────
    const [stats, setStats] = useState<HeroStat[]>(() => {
        if (!d.stats?.length) return [
            { _key: 's1', value: '15+',  label: { en: 'Years Experience',  ar: 'سنة خبرة'     } },
            { _key: 's2', value: '120+', label: { en: 'Projects Completed',ar: 'مشروع منفذ'   } },
            { _key: 's3', value: '40+',  label: { en: 'Commercial Clients',ar: 'عميل تجاري'   } },
            { _key: 's4', value: '5',    label: { en: 'Countries Served',  ar: 'دول'           } },
        ]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return d.stats.map((s: any, i: number) => ({
            _key:  s._key ?? String(i),
            value: s.value ?? '',
            label: { en: s.label?.en ?? '', ar: s.label?.ar ?? '' },
        }))
    })

    // ── Hero Text ────────────────────────────────────────────────────
    const [heroBadgeValue, setHeroBadgeValue] = useState(d.heroBadgeValue ?? '15+')
    const [heroBadgeLabel, setHeroBadgeLabel] = useState<BL>({ en: d.heroBadgeLabel?.en ?? 'Years of Craft', ar: d.heroBadgeLabel?.ar ?? 'عاماً من الإبداع' })
    const [heroEyebrow,    setHeroEyebrow]    = useState<BL>({ en: d.heroEyebrow?.en ?? '',     ar: d.heroEyebrow?.ar ?? '' })
    const [heroHeadline,   setHeroHeadline]   = useState<BL>({ en: d.heroHeadline?.en ?? '',    ar: d.heroHeadline?.ar ?? '' })
    const [heroSubheading, setHeroSubheading] = useState<BL>({ en: d.heroSubheading?.en ?? '',  ar: d.heroSubheading?.ar ?? '' })
    const [heroBtnProj,    setHeroBtnProj]    = useState<BL>({ en: d.heroBtnProjects?.en ?? '', ar: d.heroBtnProjects?.ar ?? '' })
    const [heroBtnContact, setHeroBtnContact] = useState<BL>({ en: d.heroBtnContact?.en ?? '',  ar: d.heroBtnContact?.ar ?? '' })

    // ── About Preview ────────────────────────────────────────────────
    const [aboutImgRef, setAboutImgRef] = useState(d.aboutImage?.asset?._ref ?? '')
    const [aboutImgUrl, setAboutImgUrl] = useState<string>(
        d.aboutImage ? urlFor(d.aboutImage).width(800).url() : ''
    )
    const [aboutEstTag,         setAboutEstTag]         = useState(d.aboutEstTag ?? 'EST. 2008')
    const [aboutFeaturedStat,   setAboutFeaturedStat]   = useState<BL>({ en: d.aboutFeaturedStat?.en ?? '120+ Premium Projects', ar: d.aboutFeaturedStat?.ar ?? '١٢٠+ مشروع راقٍ' })
    const [aboutFeaturedStatSub,setAboutFeaturedStatSub]= useState<BL>({ en: d.aboutFeaturedStatSub?.en ?? 'Across Kuwait & the region', ar: d.aboutFeaturedStatSub?.ar ?? 'في الكويت والمنطقة' })
    const [aboutTitle, setAboutTitle] = useState<BL>({ en: d.aboutTitle?.en ?? '', ar: d.aboutTitle?.ar ?? '' })
    const [aboutP1,    setAboutP1]    = useState<BL>({ en: d.aboutP1?.en ?? '',    ar: d.aboutP1?.ar ?? '' })
    const [aboutP2,    setAboutP2]    = useState<BL>({ en: d.aboutP2?.en ?? '',    ar: d.aboutP2?.ar ?? '' })
    const [aboutBtn,   setAboutBtn]   = useState<BL>({ en: d.aboutBtn?.en ?? '',   ar: d.aboutBtn?.ar ?? '' })

    // ── Services ─────────────────────────────────────────────────────
    const [svcTitle,    setSvcTitle]    = useState<BL>({ en: d.servicesTitle?.en ?? '',    ar: d.servicesTitle?.ar ?? '' })
    const [svcSubtitle, setSvcSubtitle] = useState<BL>({ en: d.servicesSubtitle?.en ?? '', ar: d.servicesSubtitle?.ar ?? '' })

    // ── Why Us ───────────────────────────────────────────────────────
    const [whyUsTitle, setWhyUsTitle] = useState<BL>({ en: d.whyUsTitle?.en ?? '', ar: d.whyUsTitle?.ar ?? '' })

    // ── CTA ──────────────────────────────────────────────────────────
    const [ctaTitle,      setCtaTitle]      = useState<BL>({ en: d.ctaTitle?.en ?? '',      ar: d.ctaTitle?.ar ?? '' })
    const [ctaSubtitle,   setCtaSubtitle]   = useState<BL>({ en: d.ctaSubtitle?.en ?? '',   ar: d.ctaSubtitle?.ar ?? '' })
    const [ctaBtnConsult, setCtaBtnConsult] = useState<BL>({ en: d.ctaBtnConsult?.en ?? '', ar: d.ctaBtnConsult?.ar ?? '' })
    const [ctaBtnContact, setCtaBtnContact] = useState<BL>({ en: d.ctaBtnContact?.en ?? '', ar: d.ctaBtnContact?.ar ?? '' })

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
                    _type: 'homePage', _id: 'homePage',
                    stats: stats.map(s => ({ _key: s._key, value: s.value, label: s.label })),
                    heroBadgeValue,
                    heroBadgeLabel,
                    heroSlides: slides.map(s => ({
                        _key: s._key,
                        title:    s.title,
                        location: s.location,
                        category: s.category,
                        ...(s.imageRef ? { image: { _type: 'image', asset: { _type: 'reference', _ref: s.imageRef } } } : {}),
                    })),
                    heroEyebrow,
                    heroHeadline,
                    heroSubheading,
                    heroBtnProjects: heroBtnProj,
                    heroBtnContact,
                    ...(aboutImgRef ? { aboutImage: { _type: 'image', asset: { _type: 'reference', _ref: aboutImgRef } } } : {}),
                    aboutEstTag,
                    aboutFeaturedStat,
                    aboutFeaturedStatSub,
                    aboutTitle, aboutP1, aboutP2, aboutBtn,
                    servicesTitle: svcTitle, servicesSubtitle: svcSubtitle,
                    whyUsTitle,
                    ctaTitle, ctaSubtitle, ctaBtnConsult, ctaBtnContact,
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
            <SaveBar title="Home Page" saving={saving} saved={saved} error={error} onSave={save} />
            <div className="p-8 space-y-10 max-w-3xl">

                {/* ── HERO SLIDES ─────────────────────────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                            <Images size={15} className="text-[#B05B3B]" />
                            <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Hero Slides</h2>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSlides(ss => [...ss, newSlide()])}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors font-medium"
                        >
                            <Plus size={12} /> Add Slide
                        </button>
                    </div>

                    {slides.length === 0 ? (
                        <div className="border-2 border-dashed border-stone-200 py-10 text-center">
                            <Images size={28} className="mx-auto text-stone-300 mb-2" />
                            <p className="text-sm text-stone-400 font-medium">No hero slides yet</p>
                            <p className="text-xs text-stone-400 mt-1">The frontend will show placeholder images until you add slides here.</p>
                            <button
                                type="button"
                                onClick={() => setSlides([newSlide()])}
                                className="mt-4 inline-flex items-center gap-1.5 text-xs px-4 py-2 bg-[#B05B3B] text-white hover:bg-[#9a4f32] transition-colors font-medium"
                            >
                                <Plus size={12} /> Add First Slide
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {slides.map((slide, idx) => (
                                <div key={slide._key} className="border border-stone-200 bg-stone-50/40 overflow-hidden">
                                    {/* Slide header */}
                                    <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-stone-100">
                                        <div className="flex items-center gap-2">
                                            <GripVertical size={13} className="text-stone-300" />
                                            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                                                Slide {idx + 1}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSlides(ss => ss.filter(s => s._key !== slide._key))}
                                            className="text-stone-400 hover:text-red-500 transition-colors p-0.5"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>

                                    <div className="p-4 space-y-4">
                                        {/* Image */}
                                        <ImageUpload
                                            label="Slide Image"
                                            currentUrl={slide.imageUrl || undefined}
                                            onUploaded={(assetId, url) => {
                                                updateSlide(slide._key, 'imageRef', assetId)
                                                updateSlide(slide._key, 'imageUrl', url)
                                            }}
                                        />

                                        {/* Caption fields */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <BilingualInput
                                                label="Title"
                                                enValue={slide.title.en} arValue={slide.title.ar}
                                                onEnChange={v => updateSlide(slide._key, 'title', { ...slide.title, en: v })}
                                                onArChange={v => updateSlide(slide._key, 'title', { ...slide.title, ar: v })}
                                            />
                                            <BilingualInput
                                                label="Location"
                                                enValue={slide.location.en} arValue={slide.location.ar}
                                                onEnChange={v => updateSlide(slide._key, 'location', { ...slide.location, en: v })}
                                                onArChange={v => updateSlide(slide._key, 'location', { ...slide.location, ar: v })}
                                            />
                                            <BilingualInput
                                                label="Category"
                                                enValue={slide.category.en} arValue={slide.category.ar}
                                                onEnChange={v => updateSlide(slide._key, 'category', { ...slide.category, en: v })}
                                                onArChange={v => updateSlide(slide._key, 'category', { ...slide.category, ar: v })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* ── HERO STATS ──────────────────────────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                            <BarChart2 size={15} className="text-[#B05B3B]" />
                            <div>
                                <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider">Stats Bar</h2>
                                <p className="text-[10px] text-stone-400 mt-0.5">Controls both the hero mini-stats and the full stats section</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setStats(ss => [...ss, { _key: Date.now().toString(), value: '', label: { en: '', ar: '' } }])}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-stone-100 text-stone-600 hover:bg-[#F5EAE4] hover:text-[#B05B3B] transition-colors font-medium"
                        >
                            <Plus size={12} /> Add Stat
                        </button>
                    </div>
                    <div className="space-y-3">
                        {stats.map((stat, idx) => (
                            <div key={stat._key} className="border border-stone-200 p-4 bg-stone-50/40">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Stat {idx + 1}</span>
                                    <button type="button" onClick={() => setStats(ss => ss.filter(s => s._key !== stat._key))}
                                        className="text-stone-300 hover:text-red-500 transition-colors">
                                        <X size={13} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Value</label>
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={e => setStats(ss => ss.map(s => s._key === stat._key ? { ...s, value: e.target.value } : s))}
                                            placeholder="120+"
                                            className="w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors"
                                        />
                                        <p className="text-[10px] text-stone-400 mt-1">e.g. 120+ or 15+</p>
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
                </section>

                {/* ── HERO TEXT ───────────────────────────────────── */}
                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Hero Text</h2>
                    <div className="space-y-4">

                        {/* Badge (bottom-right corner of image) */}
                        <div className="border border-stone-200 p-4 bg-stone-50/40">
                            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Badge (bottom-right of image)</p>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Value</label>
                                    <input
                                        type="text"
                                        value={heroBadgeValue}
                                        onChange={e => setHeroBadgeValue(e.target.value)}
                                        placeholder="15+"
                                        className="w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <BilingualInput label="Label"
                                        enValue={heroBadgeLabel.en} arValue={heroBadgeLabel.ar}
                                        onEnChange={v => setHeroBadgeLabel(p => ({ ...p, en: v }))}
                                        onArChange={v => setHeroBadgeLabel(p => ({ ...p, ar: v }))} />
                                </div>
                            </div>
                        </div>

                        <BilingualInput label="Eyebrow Text"
                            enValue={heroEyebrow.en} arValue={heroEyebrow.ar}
                            onEnChange={v => setHeroEyebrow(p => ({ ...p, en: v }))}
                            onArChange={v => setHeroEyebrow(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Main Headline"
                            enValue={heroHeadline.en} arValue={heroHeadline.ar}
                            onEnChange={v => setHeroHeadline(p => ({ ...p, en: v }))}
                            onArChange={v => setHeroHeadline(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Subheading"
                            enValue={heroSubheading.en} arValue={heroSubheading.ar}
                            onEnChange={v => setHeroSubheading(p => ({ ...p, en: v }))}
                            onArChange={v => setHeroSubheading(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Button — Explore Portfolio"
                            enValue={heroBtnProj.en} arValue={heroBtnProj.ar}
                            onEnChange={v => setHeroBtnProj(p => ({ ...p, en: v }))}
                            onArChange={v => setHeroBtnProj(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Button — Contact"
                            enValue={heroBtnContact.en} arValue={heroBtnContact.ar}
                            onEnChange={v => setHeroBtnContact(p => ({ ...p, en: v }))}
                            onArChange={v => setHeroBtnContact(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                {/* ── ABOUT PREVIEW ───────────────────────────────── */}
                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">About Preview</h2>
                    <div className="space-y-4">
                        <ImageUpload
                            label="Section Image"
                            currentUrl={aboutImgUrl || undefined}
                            onUploaded={(assetId, url) => { setAboutImgRef(assetId); setAboutImgUrl(url) }}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">Est. Tag</label>
                                <input type="text" value={aboutEstTag} onChange={e => setAboutEstTag(e.target.value)}
                                    placeholder="EST. 2008"
                                    className="w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors" />
                            </div>
                        </div>

                        <BilingualInput label="Featured Stat Headline"
                            enValue={aboutFeaturedStat.en} arValue={aboutFeaturedStat.ar}
                            onEnChange={v => setAboutFeaturedStat(p => ({ ...p, en: v }))}
                            onArChange={v => setAboutFeaturedStat(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Featured Stat Subtext"
                            enValue={aboutFeaturedStatSub.en} arValue={aboutFeaturedStatSub.ar}
                            onEnChange={v => setAboutFeaturedStatSub(p => ({ ...p, en: v }))}
                            onArChange={v => setAboutFeaturedStatSub(p => ({ ...p, ar: v }))} />

                        <BilingualInput label="Title"
                            enValue={aboutTitle.en} arValue={aboutTitle.ar}
                            onEnChange={v => setAboutTitle(p => ({ ...p, en: v }))}
                            onArChange={v => setAboutTitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Paragraph 1" multiline rows={3}
                            enValue={aboutP1.en} arValue={aboutP1.ar}
                            onEnChange={v => setAboutP1(p => ({ ...p, en: v }))}
                            onArChange={v => setAboutP1(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Paragraph 2" multiline rows={3}
                            enValue={aboutP2.en} arValue={aboutP2.ar}
                            onEnChange={v => setAboutP2(p => ({ ...p, en: v }))}
                            onArChange={v => setAboutP2(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Button Text"
                            enValue={aboutBtn.en} arValue={aboutBtn.ar}
                            onEnChange={v => setAboutBtn(p => ({ ...p, en: v }))}
                            onArChange={v => setAboutBtn(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                {/* ── SERVICES ────────────────────────────────────── */}
                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Services Section</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Section Title"
                            enValue={svcTitle.en} arValue={svcTitle.ar}
                            onEnChange={v => setSvcTitle(p => ({ ...p, en: v }))}
                            onArChange={v => setSvcTitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Section Subtitle" multiline rows={2}
                            enValue={svcSubtitle.en} arValue={svcSubtitle.ar}
                            onEnChange={v => setSvcSubtitle(p => ({ ...p, en: v }))}
                            onArChange={v => setSvcSubtitle(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

                {/* ── WHY CHOOSE US ───────────────────────────────── */}
                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">Why Choose Us</h2>
                    <BilingualInput label="Section Title"
                        enValue={whyUsTitle.en} arValue={whyUsTitle.ar}
                        onEnChange={v => setWhyUsTitle(p => ({ ...p, en: v }))}
                        onArChange={v => setWhyUsTitle(p => ({ ...p, ar: v }))} />
                </section>

                {/* ── CTA ─────────────────────────────────────────── */}
                <section>
                    <h2 className="text-sm font-bold text-stone-700 uppercase tracking-wider mb-4 pb-2 border-b border-stone-100">CTA Section</h2>
                    <div className="space-y-4">
                        <BilingualInput label="Headline"
                            enValue={ctaTitle.en} arValue={ctaTitle.ar}
                            onEnChange={v => setCtaTitle(p => ({ ...p, en: v }))}
                            onArChange={v => setCtaTitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Subtitle"
                            enValue={ctaSubtitle.en} arValue={ctaSubtitle.ar}
                            onEnChange={v => setCtaSubtitle(p => ({ ...p, en: v }))}
                            onArChange={v => setCtaSubtitle(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Button — Consult"
                            enValue={ctaBtnConsult.en} arValue={ctaBtnConsult.ar}
                            onEnChange={v => setCtaBtnConsult(p => ({ ...p, en: v }))}
                            onArChange={v => setCtaBtnConsult(p => ({ ...p, ar: v }))} />
                        <BilingualInput label="Button — Contact"
                            enValue={ctaBtnContact.en} arValue={ctaBtnContact.ar}
                            onEnChange={v => setCtaBtnContact(p => ({ ...p, en: v }))}
                            onArChange={v => setCtaBtnContact(p => ({ ...p, ar: v }))} />
                    </div>
                </section>

            </div>
        </div>
    )
}
