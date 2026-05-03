import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import HomeEditor from './HomeEditor'
import { client } from '@/sanity/lib/client'
import { HOME_QUERY } from '@/sanity/lib/queries'

export default async function AdminHomePage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const data = await client.fetch(HOME_QUERY)
    return (
        <AdminShell>
            <HomeEditor initialData={data} />
        </AdminShell>
    )
}
