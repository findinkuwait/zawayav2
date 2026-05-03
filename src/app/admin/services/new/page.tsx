import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../../_components/AdminShell'
import ServiceEditor from '../ServiceEditor'

export default async function NewServicePage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    return (
        <AdminShell>
            <ServiceEditor initialData={null} />
        </AdminShell>
    )
}
