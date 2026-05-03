import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import ServiceEditor from '../ServiceEditor'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const { id } = await params
    const data = await client.fetch(`*[_id == $id][0]`, { id })

    return (
        <AdminShell>
            <ServiceEditor initialData={data} />
        </AdminShell>
    )
}
