import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { PROCESS_QUERY } from '@/sanity/lib/queries'
import ProcessEditor from './ProcessEditor'

export default async function AdminProcessPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const data = await client.fetch(PROCESS_QUERY)

    return (
        <AdminShell>
            <ProcessEditor initialData={data} />
        </AdminShell>
    )
}
