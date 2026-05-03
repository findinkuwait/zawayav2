import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { CONTACT_QUERY } from '@/sanity/lib/queries'
import ContactEditor from './ContactEditor'

export default async function AdminContactPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const data = await client.fetch(CONTACT_QUERY)

    return (
        <AdminShell>
            <ContactEditor initialData={data} />
        </AdminShell>
    )
}
