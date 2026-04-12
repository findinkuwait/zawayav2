'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    function onSelectChange() {
        const nextLocale = locale === 'en' ? 'ar' : 'en';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <button
            onClick={onSelectChange}
            disabled={isPending}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors disabled:opacity-50"
            aria-label="Switch Language"
        >
            <Globe size={18} />
            <span className="text-sm font-medium">{locale === 'en' ? 'العربية' : 'EN'}</span>
        </button>
    );
}
