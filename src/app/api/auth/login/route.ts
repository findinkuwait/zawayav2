import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(req: NextRequest) {
    const { email, password } = await req.json()

    const adminEmail    = process.env.ADMIN_EMAIL    ?? 'admin@zawaya.com'
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'zawaya2024'

    if (email !== adminEmail || password !== adminPassword) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const session = await getSession()
    session.isLoggedIn = true
    session.email = email
    await session.save()

    return NextResponse.json({ ok: true })
}
