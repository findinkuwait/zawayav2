'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import ProjectPhysicsCard from '../ui/ProjectPhysicsCard';

export default function ProjectsSection() {
    const t = useTranslations('Home.Projects');
    const [filter, setFilter] = useState('All');

    const filters = [
        { key: 'All', label: t('filterAll') },
        { key: 'Retail', label: t('filterRetail') },
        { key: 'Hospitality', label: t('filterHospitality') },
        { key: 'Residential', label: t('filterResidential') }
    ];

    const projects = [
        { id: 'p1', category: 'Retail', title: 'Luxury Boutique, Avenues', location: 'Kuwait City', img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1000&auto=format&fit=crop' },
        { id: 'p2', category: 'Hospitality', title: 'Grand Hotel Lobby', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop' },
        { id: 'p3', category: 'Retail', title: 'Concept Store', location: 'Riyadh, KSA', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop' },
        { id: 'p4', category: 'Residential', title: 'Modern Penthouse', location: 'Doha, Qatar', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop' },
    ];

    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <section className="relative py-28 md:py-36 bg-background overflow-hidden">
            <div className="absolute top-0 bottom-0 right-[10%] hidden w-px bg-border md:block" />
            <div className="container relative mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <SectionHeading title={t('title')} />
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4">
                        {filters.map(f => (
                            <button
                                key={f.key}
                                onClick={() => setFilter(f.key)}
                                className={`px-6 py-2 rounded-lg font-en-body font-ar-body text-sm transition-all ${filter === f.key ? 'bg-primary text-white font-semibold shadow-[0_12px_28px_rgba(26,26,26,0.16)]' : 'border border-border text-secondary hover:border-accent hover:text-primary hover:bg-white'}`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 gap-y-16">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectPhysicsCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-20 text-center">
                    <Link
                        href="/projects"
                        className="inline-block px-10 py-4 border border-accent/30 text-primary rounded-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 transition-all font-semibold"
                    >
                        {t('btnAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
