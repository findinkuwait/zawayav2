import { getTranslations } from 'next-intl/server';
import ProcessSection from '@/components/home/ProcessSection';
import { buildMeta } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Process.Meta' });
    return buildMeta(locale, t('title'), t('description'), '/process')
}

export default async function ProcessPage() {
    return (
        <div className="pt-40 pb-24 min-h-screen bg-background">
            <ProcessSection />
        </div>
    );
}
