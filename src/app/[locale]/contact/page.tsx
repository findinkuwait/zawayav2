import { sanityFetch } from '@/sanity/lib/live'
import { CONTACT_QUERY } from '@/sanity/lib/queries'
import { getTranslations } from 'next-intl/server'
import SectionHeading from '@/components/ui/SectionHeading'
import type { CmsContactData } from '@/sanity/lib/types'
import { bl } from '@/sanity/lib/types'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Contact.Meta' })
    return { title: t('title'), description: t('description') }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'Contact' })
    const { data } = await sanityFetch({ query: CONTACT_QUERY })
    const cms = data as CmsContactData | null

    const title     = bl(cms?.title,     locale) || t('title')
    const subtitle  = bl(cms?.subtitle,  locale) || t('subtitle')
    const infoTitle = bl(cms?.infoTitle, locale) || t('infoTitle')
    const phone     = cms?.phone   || '+965 1234 5678'
    const email     = cms?.email   || 'info@zawayainternational.com'
    const address   = bl(cms?.address, locale) || 'Kuwait City, Al Asimah\nZawaya International Studios'

    const fieldClass = 'w-full px-4 py-3 bg-white border border-border text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent'

    return (
        <div className="relative pt-40 pb-28 min-h-screen bg-background text-foreground overflow-hidden">
            <div className="absolute inset-0 soft-warm-vignette opacity-70" />
            <div className="absolute top-0 bottom-0 right-[9%] hidden w-px bg-border md:block" />
            <div className="container relative mx-auto px-6 md:px-12">
                <SectionHeading title={title} subtitle={subtitle} center />

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="bg-white p-10 md:p-12 shadow-[0_22px_65px_rgba(26,26,26,0.1)] border border-border">
                        <h3 className="text-2xl font-bold font-heading mb-8 text-primary">{infoTitle}</h3>

                        <div className="space-y-8 text-primary font-body">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-primary mt-1 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-semibold">{t('location')}</h4>
                                    <p className="text-secondary mt-1 whitespace-pre-line">{address}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="text-primary shrink-0" size={24} />
                                <div>
                                    <h4 className="font-semibold">{t('phone')}</h4>
                                    <p className="text-secondary mt-1">{phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="text-primary shrink-0" size={24} />
                                <div>
                                    <h4 className="font-semibold">{t('email')}</h4>
                                    <p className="text-secondary mt-1">{email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-border">
                            <h4 className="font-semibold mb-4 text-primary font-heading">{t('social')}</h4>
                            <div className="flex items-center gap-4 text-primary">
                                <a href="#" className="p-3 bg-background border border-border hover:bg-accent hover:text-white transition-all"><Instagram size={20} /></a>
                                <a href="#" className="p-3 bg-background border border-border hover:bg-accent hover:text-white transition-all"><Facebook size={20} /></a>
                                <a href="#" className="p-3 bg-background border border-border hover:bg-accent hover:text-white transition-all"><Linkedin size={20} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 md:p-12 shadow-[0_22px_65px_rgba(26,26,26,0.1)] border border-border">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">{t('formName')}</label>
                                    <input type="text" className={fieldClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">{t('formEmail')}</label>
                                    <input type="email" className={fieldClass} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">{t('formPhone')}</label>
                                    <input type="tel" className={fieldClass} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-2">{t('formProjectType')}</label>
                                    <select className={fieldClass}>
                                        <option>Retail</option>
                                        <option>Commercial</option>
                                        <option>Hospitality</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary mb-2">{t('formMessage')}</label>
                                <textarea rows={5} className={`${fieldClass} resize-none`}></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-primary text-white font-bold font-heading hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(26,26,26,0.2)] transition-all mt-4">
                                {t('btnSend')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
