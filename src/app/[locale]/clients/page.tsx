import { sanityFetch } from '@/sanity/lib/live'
import { CLIENTS_QUERY } from '@/sanity/lib/queries'
import { getTranslations } from 'next-intl/server'
import SectionHeading from '@/components/ui/SectionHeading'
import type { CmsClientsData } from '@/sanity/lib/types'
import { bl } from '@/sanity/lib/types'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Clients.Meta' })
    return { title: t('title'), description: t('description') }
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Clients' })
    const { data } = await sanityFetch({ query: CLIENTS_QUERY })
    const cms = data as CmsClientsData | null

    const title    = bl(cms?.title,    locale) || t('title')
    const subtitle = bl(cms?.subtitle, locale) || t('subtitle')
    const clients  = cms?.clients && cms.clients.length > 0
        ? cms.clients
        : null

    return (
        <div className="relative pt-40 pb-32 min-h-screen bg-background overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-20" />
            <div className="container relative mx-auto px-6 md:px-12 text-center text-primary">
                <SectionHeading title={title} subtitle={subtitle} center />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
                    {clients
                        ? clients.map((client, idx) => (
                              <a
                                  key={idx}
                                  href={client.url ?? '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-white border border-border p-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.13)] cursor-pointer h-32"
                              >
                                  {client.logo ? (
                                      <Image
                                          src={urlFor(client.logo).width(200).height(80).fit('max').url()}
                                          alt={client.name}
                                          width={160}
                                          height={64}
                                          className="object-contain max-h-16 w-auto"
                                      />
                                  ) : (
                                      <span className="font-heading font-medium text-lg text-secondary">{client.name}</span>
                                  )}
                              </a>
                          ))
                        : Array.from({ length: 12 }).map((_, idx) => (
                              <div key={idx} className="bg-white border border-border p-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.13)] cursor-pointer h-32">
                                  <span className="font-heading font-medium text-lg text-secondary">Client {idx + 1}</span>
                              </div>
                          ))
                    }
                </div>
            </div>
        </div>
    )
}
