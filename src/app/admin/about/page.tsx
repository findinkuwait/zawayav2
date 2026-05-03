import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { ABOUT_QUERY } from '@/sanity/lib/queries'
import AboutEditor from './AboutEditor'

export default async function AdminAboutPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const data = await client.fetch(ABOUT_QUERY)

    return (
        <AdminShell>
            <AboutEditor initialData={data} />
        </AdminShell>
    )
}
