'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 'p1', category: 'Retail', title: 'Luxury Boutique, Avenues', location: 'Kuwait City',
        img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1600&auto=format&fit=crop',
    },
    {
        id: 'p2', category: 'Hospitality', title: 'Grand Hotel Lobby', location: 'Dubai, UAE',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 'p3', category: 'Retail', title: 'Concept Store', location: 'Riyadh, KSA',
        img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 'p4', category: 'Residential', title: 'Modern Penthouse', location: 'Doha, Qatar',
        img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop',
    },
];

interface PinCardProps {
    project: typeof projects[0];
    index: number;
}

function PinCard({ project, index }: PinCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0 w-[80vw] md:w-[42vw] h-[70vh] overflow-hidden group"
            data-cursor="view"
        >
            <Link href={`/projects/${project.id}`} className="block w-full h-full">
                {/* Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url("${project.img}")` }}
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />

                {/* Category pill */}
                <span className="absolute top-5 inset-s-5 bg-accent text-white text-[10px] font-body uppercase tracking-widest px-3 py-1.5 z-10">
                    {project.category}
                </span>

                {/* Ghost index number */}
                <span className="absolute top-5 inset-e-5 text-white/20 text-7xl font-heading font-bold leading-none select-none pointer-events-none">
                    0{index + 1}
                </span>

                {/* Bottom info */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h3 className="text-xl md:text-2xl font-heading font-bold text-white leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-white/60 text-sm font-body mt-1.5">{project.location}</p>
                        </div>
                        <div className="shrink-0 w-10 h-10 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/10 mb-1">
                            <ArrowUpRight size={18} className="text-white" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const t = useTranslations('Home.Projects');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // 4 cards × ~42vw + gaps ≈ 175vw total; we show ~80vw at start → shift ~175-80=95... use 175vw shift
    const xLtr = useTransform(scrollYProgress, [0, 1], ['0vw', '-175vw']);
    const xRtl = useTransform(scrollYProgress, [0, 1], ['0vw', '175vw']);
    const x = isRtl ? xRtl : xLtr;

    return (
        <section className="bg-alternate">
            {/* ── Section header — normal flow ── */}
            <div className="container mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-12">
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${isRtl ? 'md:flex-row-reverse' : ''}`}>
                    <SectionHeading title={t('title')} />
                    <Link
                        href="/projects"
                        className="group flex items-center gap-2 text-sm font-medium font-body text-accent hover:text-accent-hover transition-colors duration-300 mb-14 shrink-0"
                    >
                        {t('btnAll')}
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>

            {/* ── Pin-scroll track ── */}
            <div ref={sectionRef} className="relative" style={{ height: '300vh' }}>
                <div className="sticky top-0 h-screen overflow-hidden">
                    {/* Progress bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-px bg-accent z-20"
                        style={{ scaleX: scrollYProgress, transformOrigin: 'left', width: '100%' }}
                    />

                    {/* Scroll hint — fades out as user scrolls */}
                    <motion.div
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                        className={`absolute bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-20 flex items-center gap-2 text-xs font-body uppercase tracking-widest text-secondary pointer-events-none`}
                    >
                        <span>{isRtl ? 'مرّر للمشاهدة' : 'Scroll to explore'}</span>
                        <ArrowUpRight size={12} className={isRtl ? 'rotate-90' : ''} />
                    </motion.div>

                    {/* Horizontal card track */}
                    <motion.div
                        style={{ x }}
                        className="flex h-full items-center gap-4 md:gap-6 px-6 md:px-12 will-change-transform"
                        dir="ltr"
                    >
                        {projects.map((p, i) => (
                            <PinCard key={p.id} project={p} index={i} />
                        ))}

                        {/* End card — View All CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.32 }}
                            className="relative shrink-0 w-[60vw] md:w-[24vw] h-[70vh] border border-border flex flex-col items-center justify-center gap-6 bg-background group hover:bg-accent-light transition-colors duration-300"
                        >
                            <p className="text-[11px] font-body uppercase tracking-[0.3em] text-secondary text-center px-8">
                                {isRtl ? 'شاهد جميع الأعمال' : 'View all projects'}
                            </p>
                            <Link
                                href="/projects"
                                className="w-14 h-14 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 text-secondary"
                            >
                                <ArrowUpRight size={20} />
                            </Link>
                            <p className="text-5xl font-heading font-bold text-border/30 select-none absolute bottom-6 right-6">
                                +{projects.length}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
