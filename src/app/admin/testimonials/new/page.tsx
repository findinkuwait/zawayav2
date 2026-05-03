import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../../_components/AdminShell'
import TestimonialEditor from '../TestimonialEditor'

export default async function NewTestimonialPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    return (
        <AdminShell>
            <TestimonialEditor initialData={null} />
        </AdminShell>
    )
}
