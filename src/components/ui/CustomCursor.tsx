'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
    const [label, setLabel] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const ringRef = useRef({ x: -100, y: -100 });
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (window.innerWidth < 768) return;

        document.body.style.cursor = 'none';

        const onMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };
        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        // Smooth ring lerp
        function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
        function tick() {
            setPos((current) => {
                ringRef.current.x = lerp(ringRef.current.x, current.x, 0.1);
                ringRef.current.y = lerp(ringRef.current.y, current.y, 0.1);
                setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
                return current;
            });
            rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);

        // Listen for cursor target elements
        const handleEnterTarget = (e: Event) => {
            const el = (e.currentTarget as HTMLElement);
            setLabel(el.dataset.cursor ?? null);
        };
        const handleLeaveTarget = () => setLabel(null);

        const attachTargets = () => {
            document.querySelectorAll('[data-cursor]').forEach((el) => {
                el.addEventListener('mouseenter', handleEnterTarget);
                el.addEventListener('mouseleave', handleLeaveTarget);
            });
        };
        attachTargets();
        const observer = new MutationObserver(attachTargets);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.body.style.cursor = '';
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            observer.disconnect();
        };
    }, []);

    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    const isView = label === 'view';

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[999]">
            {/* Dot — snaps to cursor */}
            <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"
                animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0 }}
            />

            {/* Ring — lags behind */}
            <motion.div
                className={`absolute -translate-x-1/2 -translate-y-1/2 border rounded-full flex items-center justify-center transition-all duration-300 ${
                    isView
                        ? 'w-20 h-20 border-accent/60 bg-accent/5'
                        : 'w-9 h-9 border-primary/20'
                }`}
                animate={{ x: ringPos.x, y: ringPos.y, opacity: visible ? 1 : 0 }}
                transition={{ duration: 0 }}
            >
                <AnimatePresence>
                    {isView && (
                        <motion.span
                            key="view"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.2 }}
                            className="text-[9px] uppercase tracking-[0.2em] font-body text-accent font-medium"
                        >
                            VIEW
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
