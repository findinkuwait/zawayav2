'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SLIDE_DURATION = 6000; // ms per testimonial

export default function TestimonialsSection() {
    const t = useTranslations('Home.Testimonials');
    const [active, setActive] = useState(0);

    const testimonials = [
        { text: t('t1_text'), author: 'Abdullah Al-Saud', role: 'CEO, Retail Brands Group' },
        { text: t('t2_text'), author: 'Sarah Jenkins',    role: 'Director, Boutique Hotels' },
    ];

    // Auto-advance
    useEffect(() => {
        const id = setInterval(() => setActive(a => (a + 1) % testimonials.length), SLIDE_DURATION);
        return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const prev = () => setActive(a => (a === 0 ? testimonials.length - 1 : a - 1));
    const next = () => setActive(a => (a === testimonials.length - 1 ? 0 : a + 1));

    return (
        <section className="py-24 md:py-36 bg-alternate border-y border-border overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[11px] font-body uppercase tracking-[0.3em] text-accent mb-16 text-center"
                >
                    {t('title')}
                </motion.p>

                {/* Quote */}
                <div className="max-w-3xl mx-auto text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            {/* Large decorative open quote */}
                            <div className="text-8xl font-heading text-accent/20 leading-none mb-2 select-none" aria-hidden="true">
                                &ldquo;
                            </div>

                            <p className="text-xl md:text-3xl font-heading font-bold text-display leading-snug mb-10">
                                {testimonials[active].text}
                            </p>

                            <div className="flex flex-col items-center gap-1">
                                <span className="w-8 h-0.5 bg-accent mb-4 block" />
                                <span className="text-sm font-body font-medium text-primary tracking-wide">
                                    {testimonials[active].author}
                                </span>
                                <span className="text-xs font-body uppercase tracking-widest text-secondary">
                                    {testimonials[active].role}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-14">
                        <button
                            onClick={prev}
                            aria-label="Previous testimonial"
                            className="w-10 h-10 border border-border flex items-center justify-center text-secondary hover:border-accent hover:text-accent transition-colors duration-300"
                        >
                            <ArrowLeft size={16} />
                        </button>

                        {/* Auto-advance progress bars instead of static dots */}
                        <div className="flex gap-2 items-center">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className={`relative h-0.5 overflow-hidden transition-all duration-300 ${i === active ? 'w-10' : 'w-4 bg-border'}`}
                                >
                                    {i !== active && <span className="absolute inset-0 bg-border" />}
                                    {i === active && (
                                        <>
                                            <span className="absolute inset-0 bg-border/40" />
                                            <motion.span
                                                key={`fill-${active}`}
                                                className="absolute inset-y-0 left-0 bg-accent"
                                                initial={{ width: '0%' }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                                            />
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={next}
                            aria-label="Next testimonial"
                            className="w-10 h-10 border border-border flex items-center justify-center text-secondary hover:border-accent hover:text-accent transition-colors duration-300"
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
