import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import AdminShell from '../_components/AdminShell'
import { client } from '@/sanity/lib/client'
import { ALL_PROJECTS_QUERY } from '@/sanity/lib/queries'
import type { CmsProject } from '@/sanity/lib/types'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import ProjectsClient from './ProjectsClient'

export default async function AdminProjectsPage() {
    const session = await getSession()
    if (!session.isLoggedIn) redirect('/admin/login')

    const projects = (await client.fetch(ALL_PROJECTS_QUERY)) as CmsProject[] ?? []

    const list = projects.map(p => ({
        _id:      p._id,
        title:    p.title?.en ?? '(no title)',
        category: p.category?.en ?? '',
        slug:     p.slug?.current ?? '',
        imgUrl:   p.coverImage ? urlFor(p.coverImage).width(200).height(140).url() : null,
    }))

    return (
        <AdminShell>
            <ProjectsClient projects={list} />
        </AdminShell>
    )
}
