'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import HeroPhysics from './HeroPhysics';

export default function HeroSection() {
    const t = useTranslations('Home.Hero');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    return (
        <section className="relative min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden pt-36 pb-16 md:pt-0 md:pb-0">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/hero.jpg")' }}
            />
            <div className="absolute inset-0 bg-black/80 md:bg-secondary/70" />

            {/* Matter.js Floating Particles */}
            <HeroPhysics />

            {/* Content */}
            <div className="container relative mx-auto px-6 md:px-12 z-10 text-center text-white mt-10 md:mt-0">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="text-4xl md:text-7xl font-en-heading font-ar-heading font-bold mb-4 md:mb-8 max-w-4xl mx-auto leading-snug md:leading-tight"
                >
                    {t('headline')}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    className="text-base md:text-2xl font-en-body font-ar-body text-gray-200 mb-8 md:mb-12 max-w-2xl mx-auto space-y-2 md:space-y-3 leading-loose md:leading-relaxed"
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
                        className="w-full sm:w-auto px-10 py-4 md:py-5 bg-accent text-[#0f0f0f] font-semibold tracking-wide rounded-full hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2 group"
                    >
                        {t('btnProjects')}
                        <ArrowRight size={20} className={`transform transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-10 py-4 md:py-5 bg-transparent border border-white/30 text-white font-semibold tracking-wide rounded-full hover:bg-white/10 hover:border-white active:scale-95 transition-all block text-center"
                    >
                        {t('btnContact')}
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="mt-12 sm:mt-24 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-12 text-xs md:text-base text-gray-400 font-en-body font-ar-body uppercase tracking-widest px-6 text-center"
                >
                    <span>15+ Years Experience</span>
                    <span className="hidden md:inline text-accent">•</span>
                    <span>120+ Projects</span>
                    <span className="hidden md:inline text-accent">•</span>
                    <span>40+ Commercial Clients</span>
                </motion.div>
            </div>
        </section>
    );
}
