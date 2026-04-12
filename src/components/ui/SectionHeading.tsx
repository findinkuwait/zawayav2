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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`mb-14 ${dark ? 'text-primary' : 'text-foreground'} ${center ? 'text-center mx-auto' : ''}`}
        >
            <div className={`mb-6 h-px w-16 bg-accent/40 ${center ? 'mx-auto' : ''}`} />
            <h2 className="text-4xl md:text-6xl font-en-heading font-ar-heading font-bold mb-6 text-primary leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className={`text-lg md:text-xl max-w-2xl text-secondary leading-relaxed ${center ? 'mx-auto' : ''}`}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}

