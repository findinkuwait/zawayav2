import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { ALL_PROJECTS_QUERY } from '@/sanity/lib/queries';
import ProjectsSection from '@/components/home/ProjectsSection';
import type { CmsProject } from '@/sanity/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Projects.Meta' });
    return { title: t('title'), description: t('description') };
}

export default async function ProjectsPage() {
    const projects = await client.fetch(ALL_PROJECTS_QUERY, {}, { next: { revalidate: 60 } }) as CmsProject[] | null;

    return (
        <div className="pt-40 pb-24 min-h-screen bg-background">
            <ProjectsSection cmsProjects={projects} />
        </div>
    );
}
