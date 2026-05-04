import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
    icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
};
import { Playfair_Display, Inter, Cairo, Tajawal } from 'next/font/google';
import '../globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', weight: ['400', '700'] });
const tajawal = Tajawal({ subsets: ['arabic'], variable: '--font-tajawal', weight: ['400', '700'] });

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import MobileContactBar from '@/components/layout/MobileContactBar';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import PageLoader from '@/components/ui/PageLoader';
import { client } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { CmsSiteSettings } from '@/sanity/lib/types';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const siteSettings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }) as CmsSiteSettings | null;

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${playfair.variable} ${inter.variable} ${cairo.variable} ${tajawal.variable}`} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen" suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    <PageLoader />
                    <CustomCursor />
                    <Header />
                    <SmoothScrollProvider>
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer cmsData={siteSettings} locale={locale} />
                    </SmoothScrollProvider>
                    <MobileContactBar />
                    <FloatingWhatsApp />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
