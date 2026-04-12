import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'About.Meta' });
    return {
        title: t('title'),
        description: t('description')
    };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return (
        <div className="relative pt-40 pb-28 bg-background min-h-screen overflow-hidden">
            <div className="absolute top-0 bottom-0 left-[9%] hidden w-px bg-border md:block" />
            <div className="absolute inset-0 soft-warm-vignette opacity-60" />
            <div className="container relative mx-auto px-6 md:px-12">
                <SectionHeading title={t('title')} subtitle={t('subtitle')} center />
                <div className="mt-12 text-lg text-secondary space-y-6 max-w-4xl mx-auto text-center font-en-body font-ar-body leading-relaxed">
                    <p>{t('p1')}</p>
                    <p>{t('p2')}</p>
                    <p>{t('p3')}</p>
                </div>
            </div>
        </div>
    );
}
