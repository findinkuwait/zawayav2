import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import type { CmsSiteSettings } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';

export default function Footer({ cmsData, locale }: { cmsData?: CmsSiteSettings | null; locale?: string }) {
    const t = useTranslations('Navigation');
    const loc = locale ?? 'en';

    const tagline  = bl(cmsData?.footerTagline, loc) || 'Crafting exceptional interior spaces across Kuwait and the region.'
    const address  = bl(cmsData?.address, loc)       || 'Kuwait City, Al Asimah\nZawaya International Studios'
    const phone    = cmsData?.phone                  || '+965 1234 5678'
    const email    = cmsData?.email                  || 'info@zawayainternational.com'
    const instagram = cmsData?.instagram             || 'https://instagram.com'
    const facebook  = cmsData?.facebook
    const linkedin  = cmsData?.linkedin

    return (
        <footer className="relative bg-primary text-white pt-20 pb-28 md:pb-10 overflow-hidden">

            {/* Subtle top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-accent" />

            {/* Large decorative background word */}
            <span
                className="absolute -bottom-6 inset-x-0 text-center text-[10rem] md:text-[16rem] font-heading font-bold text-white/3 leading-none select-none pointer-events-none whitespace-nowrap overflow-hidden"
                aria-hidden="true"
            >
                ZAWAYA
            </span>

            <div className="container relative mx-auto px-8 md:px-12">

                {/* Top section: brand + nav + contact */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-10 border-b border-white/10 pb-14 md:pb-12 text-center md:text-start">

                    {/* Brand */}
                    <div className="space-y-6 flex flex-col items-center md:items-start">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.png"
                                alt="Zawaya International Logo"
                                width={140}
                                height={52}
                                className="object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-55">
                            {tagline}
                        </p>
                        {/* Social links */}
                        <div className="flex flex-col gap-2">
                            {instagram && (
                                <a href={instagram} target="_blank" rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-xs font-body uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300">
                                    <Instagram size={14} />
                                    Instagram
                                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            )}
                            {facebook && (
                                <a href={facebook} target="_blank" rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-xs font-body uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300">
                                    <Facebook size={14} />
                                    Facebook
                                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            )}
                            {linkedin && (
                                <a href={linkedin} target="_blank" rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-xs font-body uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300">
                                    <Linkedin size={14} />
                                    LinkedIn
                                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-body mb-6">Company</h4>
                        <ul className="space-y-4">
                            {[
                                { href: '/about',    label: t('about') },
                                { href: '/services', label: t('services') },
                                { href: '/projects', label: t('projects') },
                                { href: '/process',  label: t('process') },
                                { href: '/contact',  label: t('contact') },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors duration-200">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-body mb-6">{t('contact')}</h4>
                        <ul className="space-y-4 flex flex-col items-center md:items-start">
                            <li className="flex items-start gap-3 text-white/60 text-sm">
                                <MapPin size={15} className="shrink-0 mt-0.5 text-accent" />
                                <span className="whitespace-pre-line">{address}</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60 text-sm">
                                <Phone size={15} className="shrink-0 text-accent" />
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
                            </li>
                            <li className="flex items-center gap-3 text-white/60 text-sm">
                                <Mail size={15} className="shrink-0 text-accent" />
                                <a href={`mailto:${email}`} className="hover:text-white transition-colors break-all">{email}</a>
                            </li>
                        </ul>
                    </div>

                    {/* CTA column */}
                    <div className="flex flex-col items-center md:items-start justify-between gap-8">
                        <div>
                            <h4 className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-body mb-5">Start a Project</h4>
                            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-50">
                                Ready to transform your space? Let&apos;s talk.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-block text-sm font-medium font-body text-white border border-white/25 px-6 py-3 hover:border-accent hover:text-accent transition-colors duration-300"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-xs text-white/35 gap-4 text-center">
                    <p>&copy; {new Date().getFullYear()} {cmsData?.siteName || 'Zawaya International'}. All rights reserved.</p>
                    <p>Premium Interior Fit-Out &amp; Retail Design</p>
                </div>
            </div>
        </footer>
    );
}
