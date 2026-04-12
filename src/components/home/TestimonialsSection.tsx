'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
    const t = useTranslations('Home.Testimonials');

    const testimonials = [
        {
            text: t('t1_text'),
            author: 'Abdullah Al-Saud',
            company: 'CEO, Retail Brands Group',
            stars: 5,
        },
        {
            text: t('t2_text'),
            author: 'Sarah Jenkins',
            company: 'Director, Boutique Hotels',
            stars: 5,
        }
    ];

    return (
        <section className="relative py-28 md:py-32 bg-alternate border-y border-border overflow-hidden">
            <div className="absolute inset-0 architectural-grid opacity-20" />
            <div className="container relative mx-auto px-6 md:px-12">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <SectionHeading title={t('title')} center />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 max-w-5xl mx-auto px-4 md:px-0">
                    {testimonials.map((test, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            className="bg-white p-12 md:p-12 rounded-lg relative border border-border shadow-[0_18px_50px_rgba(26,26,26,0.08)] hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(26,26,26,0.14)] transition-all"
                        >
                            <Quote size={40} className="text-accent/20 absolute top-8 right-8" />

                            <div className="flex gap-1.5 md:gap-1 mb-8 md:mb-6">
                                {[...Array(test.stars)].map((_, i) => (
                                    <Star key={i} size={20} className="text-primary fill-primary w-5 h-5 md:w-[18px] md:h-[18px]" />
                                ))}
                            </div>

                            <p className="text-2xl md:text-xl text-secondary font-en-body font-ar-body italic leading-relaxed mb-10 md:mb-8">
                                &quot;{test.text}&quot;
                            </p>

                            <div>
                                <h4 className="font-bold text-primary font-en-heading font-ar-heading text-lg">{test.author}</h4>
                                <p className="text-secondary font-en-body font-ar-body text-sm">{test.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
