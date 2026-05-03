import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET() {
    const session = await getSession()
    if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
        token:     process.env.SANITY_API_TOKEN,
    })
}
