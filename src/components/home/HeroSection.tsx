'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import HeroPhysics from './HeroPhysics';
import { useRef } from 'react';

export default function HeroSection() {
    const t = useTranslations('Home.Hero');
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0px', '90px']);

    return (
        <section ref={sectionRef} className="relative min-h-[94svh] flex flex-col justify-center overflow-hidden pt-36 pb-20 md:pt-32 md:pb-28">
            {/* Background Image with Overlay */}
            <motion.div
                className="absolute -inset-y-16 inset-x-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/hero.jpg")', y: heroY }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-alternate/80 via-background/60 to-background/96" />
            <div className="absolute inset-0 soft-warm-vignette" />
            <div className="absolute inset-0 architectural-grid opacity-35" />

            {/* Matter.js Floating Particles */}
            <HeroPhysics />

            {/* Content */}
            <div className="container relative mx-auto px-6 md:px-12 z-10 text-center text-primary">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="text-5xl md:text-8xl font-en-heading font-ar-heading font-bold mb-6 md:mb-9 max-w-5xl mx-auto leading-tight [text-shadow:0_18px_45px_rgba(26,26,26,0.16)]"
                >
                    {t('headline')}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    className="text-base md:text-2xl font-en-body font-ar-body text-secondary mb-9 md:mb-14 max-w-2xl mx-auto space-y-2 md:space-y-3 leading-loose md:leading-relaxed"
                >
                    <p>{t('subheading1')}</p>
                    <p>{t('subheading2')}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
                >
                    <Link
                        href="/projects"
                        className="w-full sm:w-auto px-10 py-4 md:py-5 bg-primary text-white font-semibold rounded-lg hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(26,26,26,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        {t('btnProjects')}
                        <ArrowRight size={20} className={`transform transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-10 py-4 md:py-5 bg-white/60 border border-accent/30 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-0.5 active:scale-95 transition-all block text-center"
                    >
                        {t('btnContact')}
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="mt-14 sm:mt-24 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-12 text-xs md:text-base text-secondary font-en-body font-ar-body uppercase px-6 text-center"
                >
                    <span>15+ Years Experience</span>
                    <span className="hidden md:inline text-accent-hover">&middot;</span>
                    <span>120+ Projects</span>
                    <span className="hidden md:inline text-accent-hover">&middot;</span>
                    <span>40+ Commercial Clients</span>
                </motion.div>
            </div>
        </section>
    );
}
