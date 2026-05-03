'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { CmsHomeData } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (!inView) return;
        const ctrl = animate(from, to, { duration, onUpdate: (v) => setValue(Math.floor(v)) });
        return () => ctrl.stop();
    }, [from, to, duration, inView]);

    return <span ref={ref}>{value}</span>;
}

export default function StatsSection({ cmsData }: { cmsData?: CmsHomeData | null }) {
    const t = useTranslations('Home.Stats');
    const locale = useLocale();

    const cmsStats = cmsData?.stats
    const stats = cmsStats && cmsStats.length > 0
        ? cmsStats.map((s) => {
              const raw = s.value ?? ''
              const match = raw.match(/^(\d+)(.*)$/)
              return { value: match ? parseInt(match[1]) : 0, suffix: match ? match[2] : '', label: bl(s.label, locale) }
          })
        : [
              { value: 15,  suffix: '+', label: t('expLabel') },
              { value: 120, suffix: '+', label: t('projectsLabel') },
              { value: 40,  suffix: '+', label: t('clientsLabel') },
              { value: 5,   suffix: '',  label: t('countriesLabel') },
          ]

    return (
        <section className="bg-background border-y border-border">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: idx * 0.09 }}
                            className="flex-1 text-center py-14 px-4 group"
                        >
                            {/* Number */}
                            <div className="font-heading font-bold text-display leading-none mb-3 text-6xl md:text-8xl">
                                <Counter from={0} to={stat.value} duration={2} />
                                <span className="text-3xl md:text-4xl font-light text-accent ms-0.5">{stat.suffix}</span>
                            </div>
                            <p className="text-[10px] font-body uppercase tracking-[0.28em] text-secondary mt-3">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
