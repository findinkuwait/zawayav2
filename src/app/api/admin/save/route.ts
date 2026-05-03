import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import { writeClient } from '@/sanity/lib/write-client'

export async function POST(req: NextRequest) {
    const session = await getSession()
    if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { _type, _id, ...fields } = await req.json()

    try {
        if (_id) {
            await writeClient
                .patch(_id)
                .set(fields)
                .commit({ autoGenerateArrayKeys: true })
            return NextResponse.json({ ok: true, _id })
        } else {
            const created = await writeClient.create({ _type, ...fields })
            return NextResponse.json({ ok: true, _id: created._id })
        }
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Save failed' }, { status: 500 })
    }
}
