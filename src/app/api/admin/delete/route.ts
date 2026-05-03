import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { writeClient } from '@/sanity/lib/write-client'

export async function POST(req: NextRequest) {
    const session = await getSession()
    if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { _id } = await req.json()
    if (!_id) return NextResponse.json({ error: 'Missing _id' }, { status: 400 })

    try {
        await writeClient.delete(_id)
        return NextResponse.json({ ok: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
}
