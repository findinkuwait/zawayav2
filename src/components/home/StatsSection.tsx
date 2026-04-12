'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (inView) {
            const controls = animate(from, to, {
                duration,
                onUpdate(value) {
                    setValue(Math.floor(value));
                }
            });
            return () => controls.stop();
        }
    }, [from, to, duration, inView]);

    return <span ref={ref}>{value}</span>;
}

export default function StatsSection() {
    const t = useTranslations('Home.Stats');

    const stats = [
        { value: 15, suffix: '+', label: t('expLabel') },
        { value: 120, suffix: '+', label: t('projectsLabel') },
        { value: 40, suffix: '+', label: t('clientsLabel') },
        { value: 5, suffix: '', label: t('countriesLabel') }
    ];

    return (
        <section className="relative py-28 bg-alternate text-primary border-y border-border overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-30" />
            <div className="container relative mx-auto px-8 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-6xl md:text-8xl font-bold font-en-heading font-ar-heading mb-5 text-primary group-hover:text-accent transition-colors duration-300">
                                <Counter from={0} to={stat.value} duration={2} />{stat.suffix}
                            </div>
                            <div className="text-xs md:text-sm font-medium font-en-body font-ar-body uppercase text-secondary">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
