import { client } from '@/sanity/lib/client'
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { CmsProjectFull } from '@/sanity/lib/types'
import { bl } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'

export async function generateStaticParams() {
    const slugs = (await client.fetch(PROJECT_SLUGS_QUERY)) as Array<{ slug: string }> | null ?? []
    const locales = ['en', 'ar']
    return slugs.flatMap((s) => locales.map((locale) => ({ locale, slug: s.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params
    const t = await getTranslations({ locale, namespace: 'Projects.Meta' })
    const cms = await client.fetch(PROJECT_QUERY, { slug }, { next: { revalidate: 60 } }) as CmsProjectFull | null
    return {
        title: `${bl(cms?.title, locale) || slug.replace(/-/g, ' ')} | Zawaya`,
        description: t('description'),
    }
}

export default async function SingleProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params
    const t = await getTranslations({ locale, namespace: 'SingleProject' })
    const cms = await client.fetch(PROJECT_QUERY, { slug }, { next: { revalidate: 60 } }) as CmsProjectFull | null

    // Fallback to static data when CMS has no document yet
    const project = {
        title:    bl(cms?.title,    locale) || slug.replace(/-/g, ' ').toUpperCase(),
        location: bl(cms?.location, locale) || 'Kuwait City',
        area:     cms?.area         || '450 sqm',
        year:     cms?.completedAt  || '2025',
        client:   cms?.client       || 'Premium Brand',
        scope:    bl(cms?.scope,    locale) || t('scopeDesc'),
        overview: bl(cms?.overview, locale) || t('overviewDesc'),
        coverImg: cms?.coverImage ? urlFor(cms.coverImage).width(2000).url()
            : 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2000&auto=format&fit=crop',
        gallery: cms?.gallery && cms.gallery.length > 0
            ? cms.gallery.map((img) => img ? urlFor(img).width(2000).url() : '')
            : [
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
              ],
    }

    if (!cms && slug !== slug) notFound()

    return (
        <div className="relative bg-background pt-24 pb-24 overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-15" />

            {/* Hero image */}
            <div
                className="w-full h-[68vh] bg-cover bg-center relative shadow-[0_28px_80px_rgba(26,26,26,0.14)]"
                style={{ backgroundImage: `url(${project.coverImg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-alternate/65 via-background/25 to-background/95" />
                <div className="absolute inset-0 architectural-grid opacity-25" />
                <div className="absolute bottom-0 left-0 right-0 p-12 container mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-4 leading-tight text-primary [text-shadow:0_14px_34px_rgba(26,26,26,0.16)]">
                        {project.title}
                    </h1>
                    <p className="text-xl text-secondary font-body">{project.location}</p>
                </div>
            </div>

            <div className="container relative mx-auto px-6 md:px-12 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold text-primary font-heading mb-6">{t('overview')}</h2>
                            <p className="text-lg text-secondary leading-relaxed font-body">{project.overview}</p>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white p-8 md:p-10 shadow-[0_22px_65px_rgba(26,26,26,0.1)] border border-border h-fit space-y-6">
                        <h3 className="text-xl font-bold text-primary font-heading border-b border-border pb-4">{t('details')}</h3>
                        <div className="grid grid-cols-2 gap-y-4 text-sm font-body">
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
                            <span className="block text-secondary mb-2 font-body">{t('scope')}</span>
                            <span className="font-semibold text-primary font-body">{project.scope}</span>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="mt-24">
                    <h2 className="text-4xl font-bold text-primary font-heading mb-10">{t('gallery')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.gallery.map((img, idx) => (
                            <div
                                key={idx}
                                className="h-[460px] border border-border bg-cover bg-center shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.14)] transition-all duration-300"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
