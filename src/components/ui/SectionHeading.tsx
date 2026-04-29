"use client";
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    dark?: boolean;
    center?: boolean;
}

export default function SectionHeading({ title, subtitle, dark = false, center = false }: SectionHeadingProps) {
    return (
        <div className={`mb-14 ${center ? 'text-center mx-auto' : ''}`}>
            {/* Terracotta accent line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`h-0.75 w-12 bg-accent mb-6 origin-left ${center ? 'mx-auto' : ''}`}
            />

            <div className="reveal-line">
                <motion.h2
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-4xl md:text-6xl font-heading font-bold leading-[1.05] tracking-tight ${dark ? 'text-surface' : 'text-display'}`}
                >
                    {title}
                </motion.h2>
            </div>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
                    className={`text-base md:text-lg max-w-lg text-secondary font-body leading-relaxed mt-5 ${center ? 'mx-auto' : ''}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
