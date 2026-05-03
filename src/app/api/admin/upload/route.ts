import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { writeClient } from '@/sanity/lib/write-client'

export async function POST(req: NextRequest) {
    const session = await getSession()
    if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())

    try {
        const asset = await writeClient.assets.upload('image', buffer, {
            filename: file.name,
            contentType: file.type,
        })
        return NextResponse.json({ assetId: asset._id, url: asset.url })
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[upload] Sanity asset upload failed:', msg)
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
