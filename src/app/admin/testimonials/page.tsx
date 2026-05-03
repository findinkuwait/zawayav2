import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { TESTIMONIALS_QUERY } from '@/sanity/lib/queries'
import type { CmsTestimonial } from '@/sanity/lib/types'
import TestimonialsClient from './TestimonialsClient'

export default async function AdminTestimonialsPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const testimonials = (await client.fetch(TESTIMONIALS_QUERY)) as CmsTestimonial[] ?? []

    const list = testimonials.map(t => ({
        _id:     t._id,
        author:  t.author ?? '',
        quoteEn: t.quote?.en ?? '',
        order:   t.order ?? 0,
    }))

    return (
        <AdminShell>
            <TestimonialsClient testimonials={list} />
        </AdminShell>
    )
}
