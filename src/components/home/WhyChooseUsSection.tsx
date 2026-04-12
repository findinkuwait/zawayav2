'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Clock, Layers } from 'lucide-react';

export default function WhyChooseUsSection() {
    const t = useTranslations('Home.WhyUs');

    const features = [
        { icon: Users, title: t('f1_title'), desc: t('f1_desc') },
        { icon: ShieldCheck, title: t('f2_title'), desc: t('f2_desc') },
        { icon: Clock, title: t('f3_title'), desc: t('f3_desc') },
        { icon: Layers, title: t('f4_title'), desc: t('f4_desc') },
    ];

    return (
        <section className="relative py-28 md:py-32 bg-background text-primary overflow-hidden">
            <div className="absolute top-0 bottom-0 left-[12%] hidden w-px bg-border md:block" />
            <div className="container relative mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <SectionHeading title={t('title')} center />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 px-4 md:px-0">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white border border-border p-11 md:p-10 rounded-lg transition-all shadow-[0_18px_45px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,26,26,0.13)]"
                        >
                            <feature.icon size={48} className="text-primary mb-8 md:mb-6 w-12 h-12 md:w-10 md:h-10" />
                            <h3 className="text-xl font-bold font-en-heading font-ar-heading mb-3">{feature.title}</h3>
                            <p className="text-secondary font-en-body font-ar-body leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
