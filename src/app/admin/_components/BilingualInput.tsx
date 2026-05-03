'use client'

import { useState } from 'react'

interface Props {
    label: string
    enValue: string
    arValue: string
    onEnChange: (v: string) => void
    onArChange: (v: string) => void
    multiline?: boolean
    rows?: number
    required?: boolean
}

export default function BilingualInput({
    label, enValue, arValue, onEnChange, onArChange,
    multiline = false, rows = 3, required = false,
}: Props) {
    const [tab, setTab] = useState<'en' | 'ar'>('en')

    const inputClass = 'w-full px-3 py-2.5 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors resize-none'

    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wider">{label}</label>
                <div className="flex border border-stone-200 overflow-hidden text-[11px]">
                    <button
                        type="button"
                        onClick={() => setTab('en')}
                        className={`px-3 py-1 font-medium transition-colors ${tab === 'en' ? 'bg-[#B05B3B] text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
                    >
                        EN
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab('ar')}
                        className={`px-3 py-1 font-medium transition-colors ${tab === 'ar' ? 'bg-[#B05B3B] text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
                    >
                        AR
                    </button>
                </div>
            </div>
            {tab === 'en' ? (
                multiline
                    ? <textarea rows={rows} value={enValue} onChange={e => onEnChange(e.target.value)} className={inputClass} required={required} dir="ltr" />
                    : <input type="text" value={enValue} onChange={e => onEnChange(e.target.value)} className={inputClass} required={required} dir="ltr" />
            ) : (
                multiline
                    ? <textarea rows={rows} value={arValue} onChange={e => onArChange(e.target.value)} className={inputClass} required={required} dir="rtl" />
                    : <input type="text" value={arValue} onChange={e => onArChange(e.target.value)} className={inputClass} required={required} dir="rtl" />
            )}
        </div>
    )
}
