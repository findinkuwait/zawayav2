'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function AboutPreview() {
    const t = useTranslations('Home.About');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <section className="py-24 md:py-32 bg-alternate overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className={`flex flex-col md:flex-row items-start gap-12 md:gap-0 ${isRtl ? 'md:flex-row-reverse' : ''}`}>

                    {/* ── Image side ─────────────────────────────── */}
                    <motion.div
                        initial={{ clipPath: 'inset(0 0 100% 0)' }}
                        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                        className="relative w-full md:w-[55%] shrink-0"
                    >
                        {/* Large background number — decorative */}
                        <span
                            className={`absolute -top-10 font-heading font-bold text-[12rem] md:text-[16rem] leading-none text-border/60 select-none pointer-events-none z-0 ${isRtl ? 'right-0' : '-left-6'}`}
                            aria-hidden="true"
                        >
                            15
                        </span>

                        <div className="relative z-10 h-96 md:h-[580px] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center scale-100 hover:scale-[1.03] transition-transform duration-700 ease-out"
                                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop")' }}
                            />
                            {/* Subtle top vignette */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Terracotta caption tag */}
                        <div className={`absolute bottom-6 ${isRtl ? 'left-6' : 'right-6'} bg-accent px-5 py-3 z-20`}>
                            <p className="text-white text-[10px] font-body uppercase tracking-widest">Est. 2008</p>
                        </div>
                    </motion.div>

                    {/* ── Text side ──────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                        className={`w-full md:flex-1 flex flex-col pt-0 md:pt-20 ${isRtl ? 'md:pe-16' : 'md:ps-16'}`}
                    >
                        <SectionHeading title={t('title')} />

                        <div className="space-y-5 text-secondary text-base font-body leading-relaxed mb-10 max-w-md">
                            <p>{t('p1')}</p>
                            <p>{t('p2')}</p>
                        </div>

                        {/* Terracotta left-border stat */}
                        <div className={`border-s-2 border-accent ps-5 mb-12`}>
                            <p className="text-2xl font-heading font-bold text-primary leading-snug">
                                {locale === 'ar' ? '١٢٠+ مشروع راقٍ' : '120+ Premium Projects'}
                            </p>
                            <p className="text-sm text-secondary font-body mt-1">
                                {locale === 'ar' ? 'في الكويت والمنطقة' : 'Across Kuwait & the region'}
                            </p>
                        </div>

                        <Link
                            href="/about"
                            className={`group inline-flex items-center gap-3 text-sm font-medium font-body text-accent hover:text-accent-hover transition-colors duration-300`}
                        >
                            {t('btn')}
                            <ArrowRight size={14} className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
