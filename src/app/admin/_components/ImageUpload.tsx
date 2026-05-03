'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface Props {
    label?: string
    currentUrl?: string
    onUploaded: (assetId: string, url: string) => void
}

export default function ImageUpload({ label = 'Image', currentUrl, onUploaded }: Props) {
    const [preview, setPreview]   = useState<string | null>(currentUrl ?? null)
    const [uploading, setUploading] = useState(false)
    const [error, setError]       = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleFile(file: File) {
        setError('')
        setUploading(true)
        try {
            const fd = new FormData()
            fd.append('file', file)
            const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Upload failed')
            setPreview(data.url)
            onUploaded(data.assetId, data.url)
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    function onDrop(e: React.DragEvent) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    return (
        <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1.5">{label}</label>
            {preview ? (
                <div className="relative w-full h-48 border border-stone-200 overflow-hidden group">
                    <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                    <button
                        type="button"
                        onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = '' }}
                        className="absolute top-2 right-2 bg-white/90 p-1 shadow hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <X size={14} className="text-red-500" />
                    </button>
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="absolute bottom-2 right-2 bg-white/90 text-xs px-3 py-1.5 shadow hover:bg-stone-100 transition-colors text-stone-700 font-medium opacity-0 group-hover:opacity-100"
                    >
                        Change
                    </button>
                </div>
            ) : (
                <div
                    onDrop={onDrop}
                    onDragOver={e => e.preventDefault()}
                    onClick={() => inputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#B05B3B] hover:bg-[#F5EAE4]/30 transition-colors"
                >
                    <Upload size={22} className="text-stone-400" />
                    <p className="text-sm text-stone-500">
                        {uploading ? 'Uploading…' : 'Click or drag image here'}
                    </p>
                </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" onChange={onInputChange} className="hidden" />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    )
}
