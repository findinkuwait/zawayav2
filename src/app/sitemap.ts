import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { PROJECT_SLUGS_QUERY } from '@/sanity/lib/queries'

const SITE_URL = 'https://zawayainternational.com'
const locales  = ['en', 'ar']

const staticPages = ['', '/about', '/services', '/projects', '/process', '/clients', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await client.fetch(PROJECT_SLUGS_QUERY) as Array<{ slug: string }> | null ?? []

    const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((path) =>
        locales.map((locale) => ({
            url: `${SITE_URL}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency: path === '' ? 'weekly' : 'monthly' as const,
            priority: path === '' ? 1.0 : path === '/projects' ? 0.9 : 0.8,
            alternates: {
                languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
            },
        }))
    )

    const projectEntries: MetadataRoute.Sitemap = slugs.flatMap(({ slug }) =>
        locales.map((locale) => ({
            url: `${SITE_URL}/${locale}/projects/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
            alternates: {
                languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/projects/${slug}`])),
            },
        }))
    )

    return [...staticEntries, ...projectEntries]
}
