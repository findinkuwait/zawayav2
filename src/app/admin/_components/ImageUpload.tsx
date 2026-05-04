'use client'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface Props {
    label?: string
    currentUrl?: string
    onUploaded: (assetId: string, url: string) => void
}

/** Resize + compress to JPEG so it fits Vercel's 4.5 MB body limit while keeping high visual quality */
function compressImage(file: File, maxPx = 3000, quality = 0.88): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = new window.Image()
        img.onerror = reject
        img.onload = () => {
            let { width, height } = img
            if (width > maxPx || height > maxPx) {
                if (width >= height) { height = Math.round(height * maxPx / width); width = maxPx }
                else                  { width = Math.round(width * maxPx / height); height = maxPx }
            }
            const canvas = document.createElement('canvas')
            canvas.width = width; canvas.height = height
            canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
            canvas.toBlob(b => b ? resolve(b) : reject(new Error('Compression failed')), 'image/jpeg', quality)
        }
        img.src = URL.createObjectURL(file)
    })
}

export default function ImageUpload({ label = 'Image', currentUrl, onUploaded }: Props) {
    const [preview, setPreview]     = useState<string | null>(currentUrl ?? null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress]   = useState('')
    const [error, setError]         = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleFile(file: File) {
        setError('')
        setUploading(true)
        try {
            setProgress('Compressing…')
            const blob = await compressImage(file)

            setProgress('Uploading…')
            const fd = new FormData()
            fd.append('file', new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))

            const res  = await fetch('/api/admin/upload', { method: 'POST', body: fd })
            const text = await res.text()
            let data: { assetId?: string; url?: string; error?: string }
            try { data = JSON.parse(text) } catch { throw new Error(text.slice(0, 150)) }
            if (!res.ok) throw new Error(data.error || 'Upload failed')

            setPreview(data.url!)
            onUploaded(data.assetId!, data.url!)
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Upload failed')
        } finally {
            setUploading(false)
            setProgress('')
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
                    onClick={() => !uploading && inputRef.current?.click()}
                    className="w-full h-40 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-accent-light/30 transition-colors"
                >
                    <Upload size={22} className="text-stone-400" />
                    <p className="text-sm text-stone-500">
                        {uploading ? progress : 'Click or drag image here'}
                    </p>
                </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" onChange={onInputChange} className="hidden" />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    )
}
