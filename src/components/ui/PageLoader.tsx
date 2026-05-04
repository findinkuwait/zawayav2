'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PageLoader() {
    const [show, setShow]   = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const dismissTimer = setTimeout(() => setShow(false), 1600);
        let c = 0;
        const countTimer = setInterval(() => {
            c++;
            setCount(c);
            if (c >= 100) clearInterval(countTimer);
        }, 13);
        return () => { clearTimeout(dismissTimer); clearInterval(countTimer); };
    }, []);

    const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
    const lineDelay = 0.15;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[200] bg-muted flex items-center justify-center"
                    initial={{ clipPath: 'inset(0 0 0% 0)' }}
                    exit={{ clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Subtle grid overlay */}
                    <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />

                    {/* Corner lines — top-left */}
                    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute top-8 left-8 w-16 h-px bg-accent/40 origin-left" />
                    <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute top-8 left-8 w-px h-16 bg-accent/40 origin-top" />

                    {/* Corner lines — top-right */}
                    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute top-8 right-8 w-16 h-px bg-accent/40 origin-right" />
                    <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute top-8 right-8 w-px h-16 bg-accent/40 origin-top" />

                    {/* Corner lines — bottom-left */}
                    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute bottom-16 left-8 w-16 h-px bg-accent/40 origin-left" />
                    <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute bottom-16 left-8 w-px h-16 bg-accent/40 origin-bottom" />

                    {/* Corner lines — bottom-right */}
                    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute bottom-16 right-8 w-16 h-px bg-accent/40 origin-right" />
                    <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6, delay: lineDelay, ease }}
                        className="absolute bottom-16 right-8 w-px h-16 bg-accent/40 origin-bottom" />

                    {/* Centre content */}
                    <div className="flex flex-col items-center gap-7">

                        {/* Logo — bigger with a subtle glow */}
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.88 }}
                            animate={{ opacity: 1, y: 0,  scale: 1 }}
                            transition={{ duration: 0.8, ease }}
                            className="drop-shadow-[0_8px_32px_rgba(176,91,59,0.18)]"
                        >
                            <Image
                                src="/logo.png"
                                alt="Zawaya International"
                                width={320}
                                height={128}
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Divider line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.55, delay: 0.35, ease }}
                            className="w-24 h-px bg-accent/50 origin-center"
                        />

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-[9px] uppercase tracking-[0.55em] text-accent/70 font-body"
                        >
                            Interior Design &amp; Fit-Out Studio
                        </motion.p>
                    </div>

                    {/* Progress bar */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-border relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-accent"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.4, ease: 'easeInOut' }}
                            />
                        </div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[9px] font-body text-secondary/50 tabular-nums shrink-0 w-8 text-right"
                        >
                            {count}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
