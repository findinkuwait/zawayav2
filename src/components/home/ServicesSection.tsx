'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import { PenTool, Store, Coffee, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
    const t = useTranslations('Home.Services');

    const services = [
        { icon: PenTool, title: t('s1_title'), desc: t('s1_desc') },
        { icon: Store, title: t('s2_title'), desc: t('s2_desc') },
        { icon: Coffee, title: t('s3_title'), desc: t('s3_desc') },
        { icon: Briefcase, title: t('s4_title'), desc: t('s4_desc') }
    ];

    return (
        <section className="relative py-28 md:py-32 bg-alternate border-y border-border overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-25" />
            <div className="container relative mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20 md:mb-16">
                    <SectionHeading title={t('title')} subtitle={t('subtitle')} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 px-4 md:px-0">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                        >
                            <ServiceCard
                                title={service.title}
                                description={service.desc}
                                icon={service.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
