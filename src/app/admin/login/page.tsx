'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail]       = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]       = useState('')
    const [loading, setLoading]   = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            if (!res.ok) {
                const data = await res.json()
                setError(data.error ?? 'Login failed')
            } else {
                router.push('/admin')
                router.refresh()
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <Image src="/logo.png" alt="Zawaya" width={160} height={48} className="h-12 w-auto" />
                </div>

                <div className="bg-white border border-stone-200 shadow-sm p-8">
                    <h1 className="text-xl font-bold text-stone-800 mb-1">Admin Dashboard</h1>
                    <p className="text-sm text-stone-500 mb-8">Sign in to manage website content</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors"
                                placeholder="admin@zawaya.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-stone-600 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-[#B05B3B] focus:bg-white transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#B05B3B] text-white text-sm font-semibold hover:bg-[#9a4f32] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-stone-400 mt-6">
                    Zawaya International © {new Date().getFullYear()}
                </p>
            </div>
        </div>
    )
}
