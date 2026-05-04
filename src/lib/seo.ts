import type { Metadata } from 'next'

const SITE_URL = 'https://zawayainternational.com'

export function buildMeta(locale: string, title: string, description: string, path: string): Metadata {
    const url = `${SITE_URL}/${locale}${path}`
    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: { en: `${SITE_URL}/en${path}`, ar: `${SITE_URL}/ar${path}` },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'Zawaya International',
            locale: locale === 'ar' ? 'ar_KW' : 'en_US',
            type: 'website',
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zawaya International' }],
        },
        twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
    }
}
