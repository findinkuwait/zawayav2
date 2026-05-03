'use client';

import { useTranslations, useLocale } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Clock, Layers } from 'lucide-react';
import type { CmsHomeData } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';

export default function WhyChooseUsSection({ cmsData }: { cmsData?: CmsHomeData | null }) {
    const t = useTranslations('Home.WhyUs');
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const sectionTitle = bl(cmsData?.whyUsTitle, locale) || t('title')

    const features = [
        { icon: Users,       title: t('f1_title'), desc: t('f1_desc') },
        { icon: ShieldCheck, title: t('f2_title'), desc: t('f2_desc') },
        { icon: Clock,       title: t('f3_title'), desc: t('f3_desc') },
        { icon: Layers,      title: t('f4_title'), desc: t('f4_desc') },
    ];

    return (
        <section className="py-24 md:py-32 bg-alternate">
            <div className="container mx-auto px-6 md:px-12">
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                    <SectionHeading title={sectionTitle} />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xs font-body text-secondary tracking-wide mb-14 shrink-0"
                    >
                        <span className="text-accent font-semibold text-sm">15+ </span>
                        {isRtl ? 'عاماً من الخبرة في المنطقة' : 'years of expertise across the region'}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                    {features.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.12 }}
                                className={`group relative flex gap-6 p-8 md:p-10 bg-alternate hover:bg-accent-light transition-colors duration-300 overflow-hidden ${isRtl ? 'flex-row-reverse text-right' : ''}`}
                            >
                                {/* Top accent reveal line */}
                                <span className="absolute top-0 inset-x-0 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                {/* Ghost number — bottom corner */}
                                <span className={`absolute bottom-3 ${isRtl ? 'left-4' : 'right-4'} text-5xl font-heading font-bold leading-none select-none pointer-events-none text-border/40 group-hover:text-accent/15 transition-colors duration-300`}>
                                    0{idx + 1}
                                </span>

                                {/* Icon box with spring pop */}
                                <div className="shrink-0 mt-1">
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: idx * 0.12 + 0.15 }}
                                        className="w-12 h-12 border border-border bg-background flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-300"
                                    >
                                        <Icon size={22} className="text-accent group-hover:text-white transition-colors duration-300" />
                                    </motion.div>
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-lg font-heading font-bold text-primary mb-3 leading-snug">
                                        {feat.title}
                                    </h3>
                                    <p className="text-sm font-body text-secondary leading-relaxed">
                                        {feat.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
