import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import SiteSettingsEditor from './SiteSettingsEditor'

export default async function AdminSiteSettingsPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const data = await client.fetch(SITE_SETTINGS_QUERY)

    return (
        <AdminShell>
            <SiteSettingsEditor initialData={data} />
        </AdminShell>
    )
}
