'use client'

import { CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
    saving: boolean
    saved: boolean
    error: string
    onSave: () => void
    title: string
}

export default function SaveBar({ saving, saved, error, onSave, title }: Props) {
    return (
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-stone-200 sticky top-0 z-10">
            <h1 className="text-lg font-bold text-stone-800">{title}</h1>
            <div className="flex items-center gap-4">
                {error && (
                    <span className="flex items-center gap-1.5 text-sm text-red-600">
                        <AlertCircle size={15} /> {error}
                    </span>
                )}
                {saved && !error && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                        <CheckCircle size={15} /> Saved!
                    </span>
                )}
                <button
                    type="button"
                    onClick={onSave}
                    disabled={saving}
                    className="px-6 py-2 bg-[#B05B3B] text-white text-sm font-semibold hover:bg-[#9a4f32] transition-colors disabled:opacity-60"
                >
                    {saving ? 'Saving…' : 'Save Changes'}
                </button>
            </div>
        </div>
    )
}
