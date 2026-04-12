'use client';

import { Phone, MessageCircle, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MobileContactBar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past hero section (approx 500px)
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-white/95 backdrop-blur-md border border-border p-2 rounded-lg shadow-[0_18px_45px_rgba(26,26,26,0.14)] flex items-center justify-between"
                >
                    <a
                        href="tel:+96512345678"
                        className="flex-1 flex flex-col items-center justify-center py-2 text-secondary hover:text-primary transition-colors active:scale-95"
                    >
                        <Phone size={20} className="mb-1" />
                        <span className="text-[10px] font-en-body font-ar-body font-medium uppercase">Call</span>
                    </a>

                    <div className="w-[1px] h-8 bg-border" />

                    <a
                        href="https://wa.me/96512345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex flex-col items-center justify-center py-2 text-green-400 hover:text-green-300 transition-colors active:scale-95"
                    >
                        <MessageCircle size={20} className="mb-1" />
                        <span className="text-[10px] font-en-body font-ar-body font-medium uppercase">WhatsApp</span>
                    </a>

                    <div className="w-[1px] h-8 bg-border" />

                    <Link
                        href="/contact"
                        className="flex-1 flex flex-col items-center justify-center py-2 text-primary hover:text-secondary transition-colors active:scale-95"
                    >
                        <Mail size={20} className="mb-1" />
                        <span className="text-[10px] font-en-body font-ar-body font-medium uppercase">Email</span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
