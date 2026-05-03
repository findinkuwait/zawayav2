import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../../_components/AdminShell'
import ProjectEditor from '../ProjectEditor'

export default async function NewProjectPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    return (
        <AdminShell>
            <ProjectEditor initialData={null} />
        </AdminShell>
    )
}
