'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    project: {
        id: string;
        category: string;
        title: string;
        location: string;
        img: string;
    };
}

export default function ProjectPhysicsCard({ project }: ProjectCardProps) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="group"
        >
            <Link href={`/projects/${project.id}`} className="block">
                <div className="overflow-hidden rounded-lg border border-border bg-white shadow-[0_22px_65px_rgba(26,26,26,0.12)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_34px_90px_rgba(26,26,26,0.18)]">
                    <div className="relative h-[440px] md:h-[620px] overflow-hidden">
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
                            style={{ backgroundImage: `url(${project.img})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute left-6 right-6 bottom-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:left-8 md:right-8 md:bottom-8">
                            <span className="text-xs uppercase text-white/75 font-en-body font-ar-body">{project.category}</span>
                            <div className="mt-3 flex items-end justify-between gap-6">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-white font-en-heading font-ar-heading leading-tight">{project.title}</h3>
                                    <p className="text-white/80 font-en-body font-ar-body mt-2">{project.location}</p>
                                </div>
                                <ArrowUpRight className="shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
