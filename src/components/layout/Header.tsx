'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
    const t = useTranslations('Navigation');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const updateScrolledState = () => {
            scrollFrameRef.current = null;
            setIsScrolled((current) => {
                const next = window.scrollY > 50;
                return current === next ? current : next;
            });
        };

        const handleScroll = () => {
            if (scrollFrameRef.current !== null) {
                return;
            }

            scrollFrameRef.current = window.requestAnimationFrame(updateScrolledState);
        };

        updateScrolledState();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);

            if (scrollFrameRef.current !== null) {
                window.cancelAnimationFrame(scrollFrameRef.current);
            }
        };
    }, []);

    const navLinks = [
        { href: '/', label: t('home') },
        { href: '/about', label: t('about') },
        { href: '/services', label: t('services') },
        { href: '/projects', label: t('projects') },
        { href: '/process', label: t('process') },
        { href: '/clients', label: t('clients') },
        { href: '/contact', label: t('contact') }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 border-b text-[#1A1A1A] transition-[background-color,border-color,box-shadow,padding] duration-300 ease-[ease] ${isScrolled ? 'bg-white border-[#E5E5E5] py-3 shadow-[0_8px_24px_rgba(26,26,26,0.08)]' : 'bg-transparent border-transparent py-5 shadow-none'}`}>
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center rounded-sm">
                    <Image
                        src="/logo.png"
                        alt="Zawaya International Logo"
                        width={140}
                        height={50}
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-medium text-current hover:text-secondary transition-colors duration-300 ease-[ease]">
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side items */}
                <div className="hidden md:flex items-center gap-6 text-current">
                    <LanguageSwitcher />
                    <Link href="/contact" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(26,26,26,0.18)] transition-all">
                        {t('contact')}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-current transition-colors duration-300 ease-[ease]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg shadow-black/5 p-6 flex flex-col gap-6">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-primary hover:text-secondary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center justify-between border-t border-border pt-6 text-primary">
                        <LanguageSwitcher />
                        <Link href="/contact" className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent transition-colors text-center w-full ml-4">
                            {t('contact')}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
