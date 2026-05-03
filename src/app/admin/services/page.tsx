import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { SERVICES_QUERY } from '@/sanity/lib/queries'
import type { CmsService } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import ServicesClient from './ServicesClient'

export default async function AdminServicesPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const services = (await client.fetch(SERVICES_QUERY)) as CmsService[] ?? []

    const list = services.map(s => ({
        _id:    s._id,
        order:  s.order ?? 0,
        title:  s.title?.en ?? '(no title)',
        tag:    s.tag?.en ?? '',
        imgUrl: s.image ? urlFor(s.image).width(200).height(140).url() : null,
    }))

    return (
        <AdminShell>
            <ServicesClient services={list} />
        </AdminShell>
    )
}
