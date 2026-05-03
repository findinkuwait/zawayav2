import { client } from '@/sanity/lib/client'
import { ABOUT_QUERY } from '@/sanity/lib/queries'
import { getTranslations } from 'next-intl/server'
import SectionHeading from '@/components/ui/SectionHeading'
import type { CmsAboutData } from '@/sanity/lib/types'
import { bl } from '@/sanity/lib/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'About.Meta' })
    return { title: t('title'), description: t('description') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'About' })
    const cms = await client.fetch(ABOUT_QUERY, {}, { next: { revalidate: 60 } }) as CmsAboutData | null

    const title    = bl(cms?.title,    locale) || t('title')
    const subtitle = bl(cms?.subtitle, locale) || t('subtitle')
    const p1       = bl(cms?.p1,       locale) || t('p1')
    const p2       = bl(cms?.p2,       locale) || t('p2')
    const p3       = bl(cms?.p3,       locale) || t('p3')

    return (
        <div className="relative pt-40 pb-28 bg-background min-h-screen overflow-hidden">
            <div className="absolute top-0 bottom-0 left-[9%] hidden w-px bg-border md:block" />
            <div className="absolute inset-0 soft-warm-vignette opacity-60" />
            <div className="container relative mx-auto px-6 md:px-12">
                <SectionHeading title={title} subtitle={subtitle} center />
                <div className="mt-12 text-lg text-secondary space-y-6 max-w-4xl mx-auto text-center font-body leading-relaxed">
                    <p>{p1}</p>
                    <p>{p2}</p>
                    <p>{p3}</p>
                </div>
            </div>
        </div>
    )
}
