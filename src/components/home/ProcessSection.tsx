'use client';

import { useTranslations, useLocale } from 'next-intl';
import SectionHeading from '../ui/SectionHeading';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MessageSquare, PenTool, Hammer, CheckCircle2 } from 'lucide-react';
import { useRef, useState } from 'react';

const PROCESS_IMAGES = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=900&auto=format&fit=crop',
];

export default function ProcessSection() {
    const t = useTranslations('Home.Process');
    const locale = useLocale();
    const isRtl = locale === 'ar';
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { icon: MessageSquare, title: t('step1_title'), desc: t('step1_desc'), insight: locale === 'ar' ? 'نستمع قبل أن نصمم' : 'We listen before we design' },
        { icon: PenTool,       title: t('step2_title'), desc: t('step2_desc'), insight: locale === 'ar' ? 'كل تفصيل مقصود' : 'Every detail is intentional' },
        { icon: Hammer,        title: t('step3_title'), desc: t('step3_desc'), insight: locale === 'ar' ? 'الحرفية تقابل الكفاءة' : 'Craftsmanship meets efficiency' },
        { icon: CheckCircle2,  title: t('step4_title'), desc: t('step4_desc'), insight: locale === 'ar' ? 'جاهز للافتتاح' : 'Ready for opening day' },
    ];

    return (
        <section className="py-24 md:py-36 bg-background">
            <div className="container mx-auto px-6 md:px-12">
                <SectionHeading title={t('title')} subtitle={t('subtitle')} />

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mt-4 ${isRtl ? 'md:grid-flow-dense' : ''}`}>

                    {/* Left — timeline steps */}
                    <div className={`relative ${isRtl ? 'md:col-start-2' : ''}`}>
                        {/* Vertical connecting line */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className={`absolute top-6 bottom-6 w-px bg-border origin-top ${isRtl ? 'right-5.5' : 'left-5.5'}`}
                        />

                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <StepRow
                                    key={idx}
                                    step={step}
                                    idx={idx}
                                    Icon={Icon}
                                    isRtl={isRtl}
                                    isActive={activeStep === idx}
                                    onInView={() => setActiveStep(idx)}
                                />
                            );
                        })}
                    </div>

                    {/* Right — sticky active step display */}
                    <div className={`hidden md:block ${isRtl ? 'md:col-start-1' : ''}`}>
                        <div className="sticky top-32">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className={isRtl ? 'text-right' : ''}
                                >
                                    {/* Step image */}
                                    <div className="relative h-56 overflow-hidden mb-8">
                                        <motion.div
                                            initial={{ scale: 1.06 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.7, ease: 'easeOut' }}
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url("${PROCESS_IMAGES[activeStep]}")` }}
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-background/50 to-transparent pointer-events-none" />
                                        {/* Ghost number on image */}
                                        <span className={`absolute bottom-3 ${isRtl ? 'left-4' : 'right-4'} text-6xl font-heading font-bold text-white/20 leading-none select-none`}>
                                            0{activeStep + 1}
                                        </span>
                                    </div>

                                    {/* Step eyebrow */}
                                    <p className={`text-[11px] uppercase tracking-[0.25em] text-accent font-body mb-4 ${isRtl ? 'text-right' : ''}`}>
                                        {isRtl ? `الخطوة 0${activeStep + 1}` : `Step 0${activeStep + 1}`}
                                    </p>

                                    {/* Terracotta accent bar */}
                                    <div className={`h-0.5 w-10 bg-accent mb-5 ${isRtl ? 'mr-0 ml-auto' : ''}`} />

                                    {/* Title */}
                                    <h3 className="text-3xl font-heading font-bold text-display leading-snug mb-4">
                                        {steps[activeStep].title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-secondary font-body leading-relaxed mb-6 max-w-xs">
                                        {steps[activeStep].desc}
                                    </p>

                                    {/* Insight quote — left-bordered */}
                                    <p className={`text-sm text-secondary font-body italic border-s-2 border-accent ps-4 py-1`}>
                                        &ldquo;{steps[activeStep].insight}&rdquo;
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function StepRow({
    step, idx, Icon, isRtl, isActive, onInView
}: {
    step: { title: string; desc: string; insight: string };
    idx: number;
    Icon: React.ElementType;
    isRtl: boolean;
    isActive: boolean;
    onInView: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inViewRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(inViewRef, { margin: '-35% 0px -35% 0px' });

    if (isInView) onInView();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative flex gap-8 md:gap-10 pb-12 last:pb-0 ${isRtl ? 'flex-row-reverse text-right' : ''}`}
        >
            <div ref={inViewRef} className="relative shrink-0 flex flex-col items-center z-10">
                {/* Pulse ring on active step */}
                {isActive && (
                    <motion.div
                        key={`pulse-${idx}`}
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-full bg-accent/25 pointer-events-none"
                    />
                )}
                <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                        ? 'border-accent bg-accent'
                        : 'border-border bg-background group-hover:border-accent group-hover:bg-accent-light'
                }`}>
                    <Icon size={18} className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-secondary group-hover:text-accent'
                    }`} />
                </div>
            </div>

            <div className="flex-1 pt-1.5 pb-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-body mb-2">
                    {isRtl ? `الخطوة 0${idx + 1}` : `Step 0${idx + 1}`}
                </p>
                <h3 className={`text-xl md:text-2xl font-heading font-bold mb-3 leading-snug transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-primary group-hover:text-accent'
                }`}>
                    {step.title}
                </h3>
                <p className="text-secondary font-body text-sm md:text-base leading-relaxed">
                    {step.desc}
                </p>
            </div>
        </motion.div>
    );
}
