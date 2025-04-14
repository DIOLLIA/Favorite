import {useEffect, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

const DEFAULT_LOCALE = 'en';
export const SupportedLocales = ['en', 'ru'] as const;
export type Locale = (typeof SupportedLocales)[number];

export function useLocale() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const initialLang = searchParams.get('lang');
    const [currentLocale, setCurrentLocale] = useState<Locale>(
        (SupportedLocales.includes(initialLang as Locale) ? initialLang : DEFAULT_LOCALE) as Locale
    );

    useEffect(() => {
        const lang = searchParams.get('lang');

        if (!lang || !SupportedLocales.includes(lang as Locale)) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('lang', DEFAULT_LOCALE);
            router.replace(`${pathname}?${params.toString()}`);
        } else {
            setCurrentLocale(lang as Locale);
        }
    }, [searchParams, pathname, router]);

    const setLocale = (newLocale: Locale) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', newLocale);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return { currentLocale, setLocale };
}
