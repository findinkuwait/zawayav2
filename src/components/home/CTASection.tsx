'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CmsHomeData } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTASection({ cmsData }: { cmsData?: CmsHomeData | null }) {
    const t = useTranslations('Home.CTA');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const title      = bl(cmsData?.ctaTitle,      locale) || t('title')
    const subtitle   = bl(cmsData?.ctaSubtitle,   locale) || t('subtitle')
    const btnConsult = bl(cmsData?.ctaBtnConsult, locale) || t('btnConsult')
    const btnContact = bl(cmsData?.ctaBtnContact, locale) || t('btnContact')
    const words = title.split(' ');

    return (
        <section className="relative py-28 md:py-40 bg-accent-light overflow-hidden">

            {/* Corner frame — top-left */}
            <motion.span
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
                className="absolute top-8 left-8 w-12 h-px bg-accent/40 origin-left"
            />
            <motion.span
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
                className="absolute top-8 left-8 w-px h-12 bg-accent/40 origin-top"
            />
            {/* Corner frame — top-right */}
            <motion.span
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
                className="absolute top-8 right-8 w-12 h-px bg-accent/40 origin-right"
            />
            <motion.span
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1, ease }}
                className="absolute top-8 right-8 w-px h-12 bg-accent/40 origin-top"
            />
            {/* Corner frame — bottom-left */}
            <motion.span
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease }}
                className="absolute bottom-8 left-8 w-12 h-px bg-accent/40 origin-left"
            />
            <motion.span
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease }}
                className="absolute bottom-8 left-8 w-px h-12 bg-accent/40 origin-bottom"
            />
            {/* Corner frame — bottom-right */}
            <motion.span
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease }}
                className="absolute bottom-8 right-8 w-12 h-px bg-accent/40 origin-right"
            />
            <motion.span
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease }}
                className="absolute bottom-8 right-8 w-px h-12 bg-accent/40 origin-bottom"
            />

            {/* Large decorative background watermark — more visible */}
            <span
                className="absolute -bottom-8 inset-x-0 text-center text-[12rem] md:text-[18rem] font-heading font-bold text-accent/[0.07] leading-none select-none pointer-events-none whitespace-nowrap overflow-hidden"
                aria-hidden="true"
            >
                ZAWAYA
            </span>

            <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">

                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[11px] font-body uppercase tracking-[0.3em] text-accent mb-8"
                >
                    {locale === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Begin?'}
                </motion.p>

                {/* Headline — word-by-word */}
                <h2 className="font-heading font-bold leading-none tracking-tight text-4xl md:text-6xl lg:text-7xl text-display max-w-3xl mx-auto mb-8">
                    {words.map((word, i) => (
                        <span key={i} className="reveal-line inline-block me-[0.22em]">
                            <motion.span
                                className="inline-block"
                                initial={{ opacity: 0, y: 44 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.75, delay: i * 0.07, ease }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.28 }}
                    className="text-base text-secondary font-body max-w-sm mx-auto leading-relaxed mb-12"
                >
                    {subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 ${isRtl ? 'sm:flex-row-reverse' : ''}`}
                >
                    {/* Primary — split button with arrow compartment */}
                    <Link
                        href="/contact"
                        className={`group inline-flex items-stretch bg-accent text-white text-sm font-medium font-body overflow-hidden hover:bg-accent-hover transition-colors duration-300 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                        <span className="px-9 py-4 flex items-center">
                            {btnConsult}
                        </span>
                        <span className={`w-12 flex items-center justify-center border-white/20 group-hover:bg-accent-hover/60 transition-colors duration-300 ${isRtl ? 'border-e' : 'border-s'}`}>
                            <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </span>
                    </Link>

                    {/* Secondary — outlined with upward fill sweep */}
                    <Link
                        href="/contact"
                        className={`group relative inline-flex items-center gap-3 text-sm font-medium font-body text-primary border border-primary/25 px-9 py-4 overflow-hidden hover:border-primary transition-colors duration-300 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                        <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-380 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                        <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
                            {btnContact}
                        </span>
                        <ArrowRight
                            size={14}
                            className={`relative z-10 text-secondary transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5 ${isRtl ? 'rotate-180' : ''}`}
                        />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
