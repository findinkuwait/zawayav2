import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
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
                        <Footer />
                    </SmoothScrollProvider>
                    <MobileContactBar />
                    <FloatingWhatsApp />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
