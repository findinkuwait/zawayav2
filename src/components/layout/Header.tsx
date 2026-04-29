'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const update = () => {
            rafRef.current = null;
            setIsScrolled((cur) => {
                const next = window.scrollY > 60;
                return cur === next ? cur : next;
            });
        };
        const onScroll = () => {
            if (rafRef.current !== null) return;
            rafRef.current = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const navLinks = [
        { href: '/',         label: t('home') },
        { href: '/about',    label: t('about') },
        { href: '/services', label: t('services') },
        { href: '/projects', label: t('projects') },
        { href: '/process',  label: t('process') },
        { href: '/clients',  label: t('clients') },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,padding,box-shadow] duration-300 ${
                isScrolled
                    ? 'bg-white/96 backdrop-blur-sm border-b border-border py-3 shadow-sm'
                    : 'bg-transparent border-b border-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-8">

                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Zawaya International"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-7">
                    {navLinks.map(({ href, label }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`text-sm font-body transition-colors duration-200 ${
                                    active
                                        ? 'text-accent font-medium'
                                        : 'text-primary/70 hover:text-primary'
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right actions */}
                <div className="hidden md:flex items-center gap-5 shrink-0">
                    <LanguageSwitcher />
                    <Link
                        href="/contact"
                        className="bg-accent text-white text-sm font-body font-medium px-5 py-2 hover:bg-accent-hover transition-colors duration-300"
                    >
                        {t('contact')}
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsMobileMenuOpen((v) => !v)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-border shadow-lg px-6 py-6 flex flex-col gap-5">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-base font-body text-primary hover:text-accent transition-colors"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4 border-t border-border pt-5">
                        <LanguageSwitcher />
                        <Link
                            href="/contact"
                            className="flex-1 bg-accent text-white text-sm font-body font-medium px-5 py-2.5 text-center hover:bg-accent-hover transition-colors"
                        >
                            {t('contact')}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
