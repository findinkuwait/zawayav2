'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { CmsHomeData, CmsHeroSlide } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';
import { urlFor } from '@/sanity/lib/image';

const FALLBACK_SLIDES = [
    {
        img: '/hero.jpg',
        title: { en: 'Luxury Hotel Lobby', ar: 'لوبي فندق فاخر' },
        location: { en: 'Kuwait City', ar: 'الكويت' },
        category: { en: 'Hospitality', ar: 'ضيافة' },
    },
    {
        img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2000&auto=format&fit=crop',
        title: { en: 'Luxury Boutique', ar: 'بوتيك فاخر' },
        location: { en: 'The Avenues, Kuwait', ar: 'الأفنيوز، الكويت' },
        category: { en: 'Retail', ar: 'تجزئة' },
    },
    {
        img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        title: { en: 'Modern Penthouse', ar: 'بنتهاوس عصري' },
        location: { en: 'Doha, Qatar', ar: 'الدوحة، قطر' },
        category: { en: 'Residential', ar: 'سكني' },
    },
] as const;

const MINI_STATS_FALLBACK = [
    { value: 120, suffix: '+', label: { en: 'Projects',  ar: 'مشروع' } },
    { value: 15,  suffix: '+', label: { en: 'Years',     ar: 'عاماً' } },
    { value: 8,   suffix: '+', label: { en: 'Countries', ar: 'دول'   } },
];

function parseStatValue(raw: string): { value: number; suffix: string } {
    const m = /^(\d+)(.*)$/.exec(raw.trim())
    return m ? { value: parseInt(m[1], 10), suffix: m[2] } : { value: 0, suffix: '' }
}

function AnimatedCount({ to, suffix }: { to: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const ctrl = animate(0, to, {
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(Math.floor(v)),
        });
        return () => ctrl.stop();
    }, [inView, to]);

    return <span ref={ref}>{val}{suffix}</span>;
}

export default function HeroSection({ cmsData }: { cmsData?: CmsHomeData | null }) {
    const t = useTranslations('Home.Hero');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const sectionRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

    // Build slides from CMS or fallback
    const slides: Array<{ img: string; title: { en: string; ar: string }; location: { en: string; ar: string }; category: { en: string; ar: string } }> =
        cmsData?.heroSlides && cmsData.heroSlides.length > 0
            ? cmsData.heroSlides.map((s: CmsHeroSlide) => ({
                  img:      s.image ? urlFor(s.image).width(2000).url() : FALLBACK_SLIDES[0].img,
                  title:    { en: s.title?.en ?? '', ar: s.title?.ar ?? '' },
                  location: { en: s.location?.en ?? '', ar: s.location?.ar ?? '' },
                  category: { en: s.category?.en ?? '', ar: s.category?.ar ?? '' },
              }))
            : [...FALLBACK_SLIDES]

    const [activeSlide, setActiveSlide] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setActiveSlide(p => (p + 1) % slides.length), 5000);
        return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slides.length]);

    // Mouse spotlight
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = panelRef.current?.getBoundingClientRect();
        if (!rect) return;
        setSpotlight({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    }, []);

    const eyebrow     = bl(cmsData?.heroEyebrow,     locale) || t('eyebrow')
    const btnProjects = bl(cmsData?.heroBtnProjects, locale) || t('btnProjects')
    const btnContact  = bl(cmsData?.heroBtnContact,  locale) || t('btnContact')
    const headline    = bl(cmsData?.heroHeadline,    locale) || t('headline')
    const subheading  = bl(cmsData?.heroSubheading,  locale) || t('subheading1')
    const words = headline.split(' ');
    const slide = slides[activeSlide] ?? slides[0];
    const lang = locale as 'en' | 'ar';

    const badgeValue = cmsData?.heroBadgeValue || '15+'
    const badgeLabel = bl(cmsData?.heroBadgeLabel, locale) || (isRtl ? 'عاماً من الإبداع' : 'Years of Craft')

    const miniStats = cmsData?.stats?.length
        ? cmsData.stats.map(s => {
              const { value, suffix } = parseStatValue(s.value ?? '')
              return { value, suffix, label: { en: s.label?.en ?? '', ar: s.label?.ar ?? '' } }
          })
        : MINI_STATS_FALLBACK;

    return (
        <section
            ref={sectionRef}
            className={`relative min-h-screen flex flex-col md:flex-row overflow-hidden ${isRtl ? 'md:flex-row-reverse' : ''}`}
        >
            {/* ── Left / Text panel ─────────────────────────── */}
            <div
                ref={panelRef}
                onMouseMove={onMouseMove}
                className={`relative z-10 flex flex-col justify-between flex-1 px-8 md:px-14 lg:px-24 pt-36 pb-10 md:pt-28 md:pb-12 overflow-hidden ${isRtl ? 'items-end' : ''}`}
                style={{
                    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(176,91,59,0.07) 0%, transparent 55%), var(--color-muted)`,
                }}
            >
                {/* Terracotta vertical accent bar */}
                <span className={`hidden md:block absolute top-0 bottom-0 w-0.75 bg-accent ${isRtl ? 'right-0' : 'left-0'}`} />

                {/* Vertical rotated studio label */}
                <span
                    className={`hidden lg:block absolute top-1/2 -translate-y-1/2 text-[9px] uppercase tracking-[0.45em] text-secondary/30 font-body select-none whitespace-nowrap pointer-events-none ${isRtl ? 'right-7 rotate-90' : 'left-7 -rotate-90'}`}
                >
                    ZAWAYA · EST. 2008
                </span>

                {/* Top content */}
                <div className={`flex flex-col ${isRtl ? 'items-end text-right' : ''}`}>

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className={`flex items-center gap-3 mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}
                    >
                        <span className="block w-8 h-px bg-accent" />
                        <p className="text-[11px] font-body uppercase tracking-[0.3em] text-accent">
                            {eyebrow}
                        </p>
                    </motion.div>

                    {/* Headline — word-by-word upward reveal */}
                    <h1 className="font-heading font-bold leading-none tracking-tight text-[3rem] md:text-[4.2rem] lg:text-[5.4rem] xl:text-[6rem] text-display mb-8">
                        {words.map((word, i) => (
                            <span key={i} className="reveal-line inline-block me-[0.2em]">
                                <motion.span
                                    className="inline-block"
                                    initial={{ opacity: 0, y: 68 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.75 }}
                        className="h-px w-12 bg-border mb-8 origin-left"
                    />

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.82, ease: 'easeOut' }}
                        className="text-base md:text-lg text-secondary font-body max-w-sm leading-relaxed mb-10"
                    >
                        {subheading}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.05 }}
                        className={`flex flex-col sm:flex-row items-start gap-4 sm:gap-5 ${isRtl ? 'sm:flex-row-reverse' : ''}`}
                    >
                        {/* Primary — split button with arrow compartment */}
                        <Link
                            href="/projects"
                            className={`group inline-flex items-stretch bg-accent text-white text-sm font-medium font-body overflow-hidden hover:bg-accent-hover transition-colors duration-300 ${isRtl ? 'flex-row-reverse' : ''}`}
                        >
                            <span className="px-8 py-4 flex items-center">
                                {btnProjects}
                            </span>
                            {/* Arrow compartment — separated by thin white line */}
                            <span className={`w-12 flex items-center justify-center border-white/20 transition-colors duration-300 group-hover:bg-accent-hover/60 ${isRtl ? 'border-e' : 'border-s'}`}>
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </span>
                        </Link>

                        {/* Secondary — outlined with upward fill sweep */}
                        <Link
                            href="/contact"
                            className={`group relative inline-flex items-center gap-3 text-sm font-medium font-body text-primary border border-primary/25 px-8 py-4 overflow-hidden hover:border-primary transition-colors duration-300 ${isRtl ? 'flex-row-reverse' : ''}`}
                        >
                            {/* Fill sweeps up from bottom on hover */}
                            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-380 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                            <span className="relative z-10 transition-colors duration-200 group-hover:text-white">
                                {btnContact}
                            </span>
                            <ArrowRight
                                size={14}
                                className={`relative z-10 text-secondary transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5 ${isRtl ? 'rotate-180' : ''}`}
                            />
                        </Link>
                    </motion.div>
                </div>

                {/* Bottom — stats + scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.3 }}
                    className={`flex items-end justify-between mt-12 ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                    <div className={`flex items-stretch gap-0 ${isRtl ? 'flex-row-reverse gap-6' : 'divide-x divide-border'}`}>
                        {miniStats.map((stat, i) => (
                            <div key={i} className={`${isRtl ? '' : 'px-6 first:pl-0 last:pr-0'} flex flex-col gap-1`}>
                                <span className="text-2xl md:text-3xl font-heading font-bold text-primary leading-none">
                                    <AnimatedCount to={stat.value} suffix={stat.suffix} />
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-secondary font-body">
                                    {stat.label[lang]}
                                </span>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        className="hidden md:flex flex-col items-center gap-1.5 text-secondary"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    >
                        <span className="text-[9px] uppercase tracking-widest font-body">
                            {isRtl ? 'للأسفل' : 'Scroll'}
                        </span>
                        <ChevronDown size={14} />
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Right / Image panel ───────────────────────── */}
            <motion.div
                className={`relative overflow-hidden w-full md:w-[52%] h-[52vh] md:h-auto shrink-0 ${isRtl ? 'md:order-first' : ''}`}
                initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Parallax wrapper */}
                <motion.div className="absolute inset-0 w-full h-[115%] -top-[7%]" style={{ y: imageY }}>

                    {/* Cross-fade carousel */}
                    <AnimatePresence>
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.4, ease: 'easeInOut' }}
                            className="absolute inset-0"
                        >
                            {/* Ken burns: slow zoom during each slide's 5-second window */}
                            <motion.div
                                initial={{ scale: 1.0 }}
                                animate={{ scale: 1.08 }}
                                transition={{ duration: 5.5, ease: 'linear' }}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url("${slides[activeSlide]?.img ?? ''}")` }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent pointer-events-none z-10" />
                <div className={`absolute inset-y-0 w-16 bg-linear-to-r from-muted/50 to-transparent pointer-events-none z-10 ${isRtl ? 'right-0 rotate-180' : 'left-0'}`} />

                {/* Terracotta progress bar — resets per slide */}
                <motion.div
                    key={`progress-${activeSlide}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left z-30"
                />

                {/* Slide counter — top corner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                    className={`absolute top-8 ${isRtl ? 'left-8' : 'right-8'} z-20 flex items-baseline gap-1.5`}
                >
                    <span className="text-xl font-heading font-bold text-white/80 leading-none tabular-nums">
                        {String(activeSlide + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/25 text-xs font-body">/</span>
                    <span className="text-xs text-white/25 font-body tabular-nums">
                        {String(slides.length).padStart(2, '0')}
                    </span>
                </motion.div>

                {/* Vertical slide navigation — thin bars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 1.5 }}
                    className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-5' : 'right-5'} z-20 flex flex-col gap-2 items-center`}
                >
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveSlide(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`block w-0.5 transition-all duration-500 origin-top rounded-full ${i === activeSlide ? 'h-8 bg-accent' : 'h-3 bg-white/30 hover:bg-white/60'}`}
                        />
                    ))}
                </motion.div>

                {/* 15+ Years badge */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                    className={`absolute bottom-10 ${isRtl ? 'left-8' : 'right-8'} bg-white/92 backdrop-blur-sm px-6 py-5 shadow-lg z-20`}
                >
                    <p className="text-4xl font-bold font-heading text-accent leading-none">{badgeValue}</p>
                    <p className="text-[10px] uppercase tracking-widest text-secondary font-body mt-1.5">
                        {badgeLabel}
                    </p>
                </motion.div>

                {/* Animated project caption — updates per slide */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`caption-${activeSlide}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className={`absolute bottom-10 ${isRtl ? 'right-8' : 'left-8'} z-20`}
                    >
                        <p className="text-[9px] uppercase tracking-widest text-white/45 font-body mb-1">
                            {slide.category[lang]}
                        </p>
                        <p className="text-sm font-heading font-semibold text-white drop-shadow-md">
                            {slide.title[lang]}
                        </p>
                        <p className="text-[10px] text-white/45 font-body mt-0.5">
                            {slide.location[lang]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
