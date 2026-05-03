'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { CmsService, CmsHomeData } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';
import { urlFor } from '@/sanity/lib/image';

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=900&auto=format&fit=crop',
];

const CAPABILITIES_EN = [
    ['Partitions', 'Ceilings', 'Custom Joinery'],
    ['Brand Identity', 'Visual Merch.', 'Fixtures'],
    ['F&B Concepts', 'Hotel Lobbies', 'Spa Interiors'],
    ['Scheduling', 'Procurement', 'Handover'],
];
const CAPABILITIES_AR = [
    ['تقسيمات', 'أسقف', 'نجارة مخصصة'],
    ['هوية بصرية', 'عرض بضائع', 'تجهيزات'],
    ['مفاهيم مطاعم', 'لوبيات فنادق', 'سبا'],
    ['جدولة', 'مشتريات', 'تسليم'],
];

export default function ServicesSection({
    cmsServices,
    cmsData,
}: {
    cmsServices?: CmsService[] | null
    cmsData?: CmsHomeData | null
}) {
    const t = useTranslations('Home.Services');
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const [hovered, setHovered] = useState<number>(0);

    const services = cmsServices && cmsServices.length > 0
        ? cmsServices.map((s, idx) => ({
              num: String(idx + 1).padStart(2, '0'),
              title: bl(s.title, locale) || '',
              desc:  bl(s.description, locale) || '',
              tag:   bl(s.tag, locale) || '',
              image: s.image ? urlFor(s.image).width(900).url() : FALLBACK_IMAGES[idx] ?? FALLBACK_IMAGES[0],
              capabilities: (bl(s.capabilities, locale) || '').split(',').map((c) => c.trim()).filter(Boolean),
          }))
        : [
              { num: '01', title: t('s1_title'), desc: t('s1_desc'), tag: isRtl ? 'تجاري وسكني'          : 'Commercial & Residential', image: FALLBACK_IMAGES[0], capabilities: isRtl ? CAPABILITIES_AR[0] : CAPABILITIES_EN[0] },
              { num: '02', title: t('s2_title'), desc: t('s2_desc'), tag: isRtl ? 'تجزئة وعلامات تجارية' : 'Retail & Branding',         image: FALLBACK_IMAGES[1], capabilities: isRtl ? CAPABILITIES_AR[1] : CAPABILITIES_EN[1] },
              { num: '03', title: t('s3_title'), desc: t('s3_desc'), tag: isRtl ? 'فنادق ومطاعم'          : 'Hotels & F&B',              image: FALLBACK_IMAGES[2], capabilities: isRtl ? CAPABILITIES_AR[2] : CAPABILITIES_EN[2] },
              { num: '04', title: t('s4_title'), desc: t('s4_desc'), tag: isRtl ? 'تسليم مفتاح'           : 'Turnkey Delivery',          image: FALLBACK_IMAGES[3], capabilities: isRtl ? CAPABILITIES_AR[3] : CAPABILITIES_EN[3] },
          ]

    const sectionTitle    = bl(cmsData?.servicesTitle,    locale) || t('title')
    const sectionSubtitle = bl(cmsData?.servicesSubtitle, locale) || t('subtitle')

    return (
        <section className="py-24 md:py-36 bg-background">
            <div className="container mx-auto px-6 md:px-12">

                <div className={`flex flex-col md:flex-row gap-16 md:gap-20 ${isRtl ? 'md:flex-row-reverse' : ''}`}>

                    {/* ── List side ───────────────────────────── */}
                    <div className="flex-1 min-w-0">
                        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

                        <ol>
                            {services.map((svc, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.55, delay: idx * 0.08 }}
                                    onMouseEnter={() => setHovered(idx)}
                                    className={`group border-t border-border last:border-b cursor-default transition-colors duration-200 ${hovered === idx ? 'bg-accent-light' : 'hover:bg-muted'}`}
                                >
                                    {/* ── Main row ── */}
                                    <div className={`flex items-center gap-6 py-6 px-4 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                                        {/* Number */}
                                        <span className={`text-xl font-heading font-bold shrink-0 transition-colors duration-200 ${hovered === idx ? 'text-accent' : 'text-border'}`}>
                                            {svc.num}
                                        </span>

                                        {/* Title + tag */}
                                        <div className={`flex flex-col gap-0.5 flex-1 ${isRtl ? 'items-end' : ''}`}>
                                            <span className={`text-2xl md:text-3xl font-heading font-bold text-primary leading-tight transition-transform duration-300 ${hovered === idx ? (isRtl ? '-translate-x-1' : 'translate-x-1') : ''}`}>
                                                {svc.title}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-widest text-secondary/50 font-body">
                                                {svc.tag}
                                            </span>
                                        </div>

                                        {/* Arrow */}
                                        <ArrowUpRight
                                            size={20}
                                            className={`shrink-0 transition-all duration-300 ${hovered === idx ? 'text-accent opacity-100' : 'text-secondary opacity-0 group-hover:opacity-100'}`}
                                        />
                                    </div>

                                    {/* ── Expanded content ── */}
                                    <AnimatePresence>
                                        {hovered === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden px-4 pb-7"
                                            >
                                                {/* Description */}
                                                <p className="text-sm font-body text-secondary leading-relaxed max-w-md mb-5">
                                                    {svc.desc}
                                                </p>

                                                {/* Capability chips */}
                                                <div className={`flex flex-wrap gap-2 mb-5 ${isRtl ? 'justify-end' : ''}`}>
                                                    {svc.capabilities.map((cap) => (
                                                        <span
                                                            key={cap}
                                                            className="text-[10px] uppercase tracking-wider font-body text-accent border border-accent/30 bg-accent/5 px-3 py-1"
                                                        >
                                                            {cap}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <Link
                                                    href="/projects"
                                                    className={`group/cta inline-flex items-center gap-2 text-xs font-medium font-body text-accent hover:text-accent-hover transition-colors duration-200 ${isRtl ? 'flex-row-reverse' : ''}`}
                                                >
                                                    {isRtl ? 'عرض المشاريع' : 'View Related Projects'}
                                                    <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            ))}
                        </ol>
                    </div>

                    {/* ── Image side (desktop only) ────────────── */}
                    <div className="hidden md:block w-80 xl:w-104 shrink-0 self-start sticky top-32">
                        <div className="relative h-130 overflow-hidden">

                            {/* Cross-fade image */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={hovered}
                                    initial={{ opacity: 0, scale: 1.04 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url("${services[hovered]?.image ?? FALLBACK_IMAGES[0]}")` }}
                                />
                            </AnimatePresence>

                            {/* Category badge — top */}
                            <span className="absolute top-5 inset-s-5 bg-accent text-white text-[10px] font-body uppercase tracking-widest px-3 py-1.5 z-10">
                                {services[hovered].tag}
                            </span>

                            {/* Ghost service number — bottom-right watermark */}
                            <span className={`absolute bottom-16 ${isRtl ? 'left-4' : 'right-4'} text-[9rem] font-heading font-bold text-white/10 leading-none select-none pointer-events-none z-10`}>
                                {services[hovered].num}
                            </span>

                            {/* Bottom caption */}
                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-primary/70 to-transparent p-6 z-10">
                                <p className="text-white/50 text-[9px] uppercase tracking-widest font-body mb-1.5">
                                    {services[hovered]?.num} / {String(services.length).padStart(2, '0')}
                                </p>
                                <p className="text-white text-base font-heading font-bold leading-snug">
                                    {services[hovered].title}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
