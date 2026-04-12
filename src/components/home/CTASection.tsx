'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function CTASection() {
    const t = useTranslations('Home.CTA');

    return (
        <section className="relative py-28 md:py-36 bg-background overflow-hidden">
            <div className="container relative mx-auto px-4 md:px-12 z-10">
                <div className="bg-gradient-to-br from-alternate via-background to-alternate p-12 md:p-28 rounded-lg relative overflow-hidden border border-border shadow-[0_26px_80px_rgba(26,26,26,0.12)]">
                    <div className="absolute inset-0 architectural-grid opacity-25" />
                    <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-accent/20 md:block" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-5xl md:text-7xl font-bold font-en-heading font-ar-heading mb-6 md:mb-8 text-primary leading-tight">
                            {t('title')}
                        </h2>
                        <p className="text-lg md:text-xl font-en-body font-ar-body max-w-xl mx-auto text-secondary leading-relaxed">
                            {t('subtitle')}
                        </p>

                        <div className="mt-12 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6 w-full">
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-10 py-5 md:py-4 bg-primary text-white font-semibold rounded-lg hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(26,26,26,0.2)] active:scale-95 transition-all block text-center"
                            >
                                {t('btnConsult')}
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto px-10 py-5 md:py-4 bg-transparent border border-accent/30 text-primary font-semibold rounded-lg hover:bg-white hover:border-primary hover:-translate-y-0.5 active:scale-95 transition-all font-en-heading font-ar-heading block text-center"
                            >
                                {t('btnContact')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
