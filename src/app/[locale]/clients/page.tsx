import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/ui/SectionHeading';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'Clients.Meta' });
    return {
        title: t('title'),
        description: t('description')
    };
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Clients' });

    // Placeholder clients array
    const clients = Array.from({ length: 12 }).map((_, i) => `Client ${i + 1}`);

    return (
        <div className="relative pt-40 pb-32 min-h-screen bg-background overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-20" />
            <div className="container relative mx-auto px-6 md:px-12 text-center text-primary">
                <SectionHeading title={t('title')} subtitle={t('subtitle')} center />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
                    {clients.map((client, idx) => (
                        <div key={idx} className="bg-white border border-border p-8 rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.13)] cursor-pointer h-32">
                            <span className="font-en-heading font-ar-heading font-medium text-lg text-secondary">{client}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
