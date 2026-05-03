import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { CLIENTS_QUERY } from '@/sanity/lib/queries'
import ClientsEditor from './ClientsEditor'

export default async function AdminClientsPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const data = await client.fetch(CLIENTS_QUERY)

    return (
        <AdminShell>
            <ClientsEditor initialData={data} />
        </AdminShell>
    )
}
