'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useLocale } from 'next-intl';

export default function AboutPreview() {
    const t = useTranslations('Home.About');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <section className="py-28 md:py-32 bg-background relative overflow-hidden">
            <div className="absolute top-0 bottom-0 left-[8%] hidden w-px bg-border md:block" />
            <div className="absolute inset-0 soft-warm-vignette opacity-60" />
            <div className="container relative mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative h-[440px] md:h-[640px] rounded-lg overflow-hidden border border-border shadow-[0_28px_80px_rgba(26,26,26,0.16)]"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop")' }}
                        />
                        <div className="absolute inset-0 border border-white/60 m-4 rounded-lg" />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 flex flex-col items-start"
                    >
                        <SectionHeading title={t('title')} />

                        <div className="space-y-6 text-secondary text-lg font-en-body font-ar-body leading-loose mb-10 max-w-prose">
                            <p>{t('p1')}</p>
                            <p>{t('p2')}</p>
                        </div>

                        <ul className="space-y-4 mb-12 text-primary font-en-body font-ar-body max-w-prose">
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent-hover" />
                                <span>{t('bullet1')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent-hover" />
                                <span>{t('bullet2')}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent-hover" />
                                <span>{t('bullet3')}</span>
                            </li>
                        </ul>

                        <Link
                            href="/about"
                            className="w-full sm:w-auto text-center justify-center px-8 py-4 border border-accent/30 text-primary rounded-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group"
                        >
                            {t('btn')}
                            <ArrowRight size={18} className={`transition-transform transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
