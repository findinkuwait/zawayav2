import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Playfair_Display, Inter, Cairo, Tajawal } from 'next/font/google';
import '../globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import MobileContactBar from '@/components/layout/MobileContactBar';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';
import CustomCursor from '@/components/ui/CustomCursor';
import PageLoader from '@/components/ui/PageLoader';
import JsonLd from '@/components/ui/JsonLd';
import { client } from '@/sanity/lib/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries';
import type { CmsSiteSettings } from '@/sanity/lib/types';
import { bl } from '@/sanity/lib/types';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter    = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo    = Cairo({ subsets: ['arabic'], variable: '--font-cairo', weight: ['400', '700'] });
const tajawal  = Tajawal({ subsets: ['arabic'], variable: '--font-tajawal', weight: ['400', '700'] });

const SITE_URL = 'https://zawayainternational.com';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const isAr = locale === 'ar';

    const title       = isAr ? 'زوايا الدولية | تصميم وتجهيز المساحات الداخلية' : 'Zawaya International | Interior Design & Fit-Out Studio';
    const description = isAr
        ? 'زوايا الدولية — متخصصون في تصميم وتنفيذ المساحات الداخلية والتجارية الفاخرة في الكويت والمنطقة.'
        : 'Zawaya International — specialists in high-end interior fit-out and retail space design across Kuwait and the region.';
    const url = `${SITE_URL}/${locale}`;

    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: title,
            template: isAr ? '%s | زوايا الدولية' : '%s | Zawaya International',
        },
        description,
        keywords: isAr
            ? ['تصميم داخلي', 'تجهيز مساحات', 'ديكور الكويت', 'زوايا الدولية', 'تصميم محلات']
            : ['interior design Kuwait', 'fit-out Kuwait', 'retail design', 'Zawaya International', 'commercial interior'],
        authors: [{ name: 'Zawaya International' }],
        creator: 'Zawaya International',
        openGraph: {
            type: 'website',
            locale: isAr ? 'ar_KW' : 'en_US',
            alternateLocale: isAr ? 'en_US' : 'ar_KW',
            url,
            siteName: 'Zawaya International',
            title,
            description,
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zawaya International' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.png'],
        },
        alternates: {
            canonical: url,
            languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` },
        },
        icons: { icon: '/favicon.ico', shortcut: '/favicon.ico' },
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) notFound();

    const messages     = await getMessages();
    const siteSettings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }) as CmsSiteSettings | null;

    const address = bl(siteSettings?.address, 'en') || 'Mirquab, Block 1, Building 5, Floor 4, Office 4, Kuwait City';
    const phone   = siteSettings?.phone   || '+96555980816';
    const email   = siteSettings?.email   || 'info@zawayainternational.com';

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}
            className={`${playfair.variable} ${inter.variable} ${cairo.variable} ${tajawal.variable}`}
            suppressHydrationWarning>
            <body className="flex flex-col min-h-screen" suppressHydrationWarning>
                <NextIntlClientProvider messages={messages}>
                    <JsonLd address={address} phone={phone} email={email} />
                    <PageLoader />
                    <CustomCursor />
                    <Header />
                    <SmoothScrollProvider>
                        <main className="grow">
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
