'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PageLoader() {
    const [show, setShow] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const dismissTimer = setTimeout(() => setShow(false), 1350);
        let c = 0;
        const countTimer = setInterval(() => {
            c++;
            setCount(c);
            if (c >= 100) clearInterval(countTimer);
        }, 11); // 100 × 11ms = 1100ms
        return () => { clearTimeout(dismissTimer); clearInterval(countTimer); };
    }, []);

    // Shared easing for corner lines
    const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-200 bg-muted flex items-center justify-center"
                    initial={{ clipPath: 'inset(0 0 0% 0)' }}
                    exit={{ clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* ── Corner frame — top-left ── */}
                    <motion.span
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute top-8 left-8 w-12 h-px bg-accent/50 origin-left"
                    />
                    <motion.span
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute top-8 left-8 w-px h-12 bg-accent/50 origin-top"
                    />

                    {/* ── Corner frame — top-right ── */}
                    <motion.span
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute top-8 right-8 w-12 h-px bg-accent/50 origin-right"
                    />
                    <motion.span
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute top-8 right-8 w-px h-12 bg-accent/50 origin-top"
                    />

                    {/* ── Corner frame — bottom-left ── */}
                    <motion.span
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute bottom-14 left-8 w-12 h-px bg-accent/50 origin-left"
                    />
                    <motion.span
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute bottom-14 left-8 w-px h-12 bg-accent/50 origin-bottom"
                    />

                    {/* ── Corner frame — bottom-right ── */}
                    <motion.span
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute bottom-14 right-8 w-12 h-px bg-accent/50 origin-right"
                    />
                    <motion.span
                        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                        transition={{ duration: 0.55, delay: 0.1, ease }}
                        className="absolute bottom-14 right-8 w-px h-12 bg-accent/50 origin-bottom"
                    />

                    {/* ── Logo + tagline ── */}
                    <div className="flex flex-col items-center gap-5">
                        <motion.div
                            initial={{ opacity: 0, y: 18, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.75, ease }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Zawaya International"
                                width={220}
                                height={88}
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Tagline under logo */}
                        <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.38 }}
                            className="text-[9px] uppercase tracking-[0.5em] text-accent/60 font-body"
                        >
                            Interior Design &amp; Fit-Out Studio
                        </motion.p>
                    </div>

                    {/* ── Progress bar + percentage counter ── */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-border relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-accent"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                            />
                        </div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-[9px] font-body text-secondary/40 tabular-nums shrink-0 w-8 text-right"
                        >
                            {count}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
