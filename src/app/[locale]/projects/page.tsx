import { getTranslations } from 'next-intl/server';
import ProjectsSection from '@/components/home/ProjectsSection'; // Reusing section

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Projects.Meta' });
    return {
        title: t('title'),
        description: t('description')
    };
}

export default async function ProjectsPage() {
    return (
        <div className="pt-40 pb-24 min-h-screen bg-background">
            <ProjectsSection />
        </div>
    );
}
