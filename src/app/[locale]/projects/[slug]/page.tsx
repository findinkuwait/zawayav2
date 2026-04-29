import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Projects.Meta' });
    return {
        title: `${slug.replace('-', ' ')} | Zawaya`,
        description: t('description')
    };
}

export default async function SingleProjectPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'SingleProject' });

    // Placeholder static project data
    const project = {
        title: slug.replace(/-/g, ' ').toUpperCase(),
        location: 'Kuwait City',
        area: '450 sqm',
        year: '2025',
        client: 'Premium Brand',
        scope: t('scopeDesc'),
        overview: t('overviewDesc'),
        images: [
            'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop'
        ]
    };

    return (
        <div className="relative bg-background pt-24 pb-24 overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-15" />
            {/* Hero Image */}
            <div
                className="w-full h-[68vh] bg-cover bg-center relative shadow-[0_28px_80px_rgba(26,26,26,0.14)]"
                style={{ backgroundImage: `url(${project.images[0]})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-alternate/65 via-background/25 to-background/95" />
                <div className="absolute inset-0 architectural-grid opacity-25" />
                <div className="absolute bottom-0 left-0 right-0 p-12 text-primary container mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold font-en-heading font-ar-heading mb-4 leading-tight [text-shadow:0_14px_34px_rgba(26,26,26,0.16)]">{project.title}</h1>
                    <p className="text-xl text-secondary font-en-body font-ar-body">{project.location}</p>
                </div>
            </div>

            <div className="container relative mx-auto px-6 md:px-12 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-primary font-en-heading font-ar-heading mb-6">{t('overview')}</h2>
                            <p className="text-lg text-secondary leading-relaxed font-en-body font-ar-body">{project.overview}</p>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white p-8 md:p-10 rounded-lg shadow-[0_22px_65px_rgba(26,26,26,0.1)] border border-border h-fit space-y-6">
                        <h3 className="text-xl font-bold text-primary font-en-heading font-ar-heading border-b border-border pb-4">{t('details')}</h3>

                        <div className="grid grid-cols-2 gap-y-4 text-sm font-en-body font-ar-body">
                            <span className="text-secondary">{t('client')}</span>
                            <span className="font-semibold text-primary text-right">{project.client}</span>

                            <span className="text-secondary">{t('location')}</span>
                            <span className="font-semibold text-primary text-right">{project.location}</span>

                            <span className="text-secondary">{t('area')}</span>
                            <span className="font-semibold text-primary text-right">{project.area}</span>

                            <span className="text-secondary">{t('year')}</span>
                            <span className="font-semibold text-primary text-right">{project.year}</span>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <span className="block text-secondary mb-2 font-en-body font-ar-body">{t('scope')}</span>
                            <span className="font-semibold text-primary font-en-body font-ar-body">{project.scope}</span>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mt-24">
                    <h2 className="text-4xl font-bold text-primary font-en-heading font-ar-heading mb-10">{t('gallery')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.images.slice(1).map((img, idx) => (
                            <div
                                key={idx}
                                className="h-[460px] rounded-lg border border-border bg-cover bg-center shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.14)] transition-all duration-300"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
